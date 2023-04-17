const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const {Phones, PhonesInfo, Type, Brand, OrderPhones, BasketPhones} = require('../models/models');
const apiError = require('../error/apiError');
const Sequelize = require("sequelize");
const { model } = require("../db/db");

function updateOrCreate(model, where, newItem) {
    // First try to find the record
    return model.findOne({ where: where }).then(function (foundItem) {
        if (!foundItem) {
            // Item not found, create a new one
            return model.create(newItem).then(function (item) {
                return { item: item, created: true };
            });
        }
        // Found an item, update it
        return model.update(newItem, { where: where }).then(function (item) {
            return { item: item, created: false };
        });
    });
}

class PhonesController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const phones = await Phones.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName
            });

            if(info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    PhonesInfo.create({
                        title: i.title,
                        description: i.description,
                        phoneId: phones.id
                    })
                })
            }

            return res.json(phones);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }
    async getAllAn(req, res, next)
    {
        const clothing = await Phones.findAll({include: [{model: Brand}]});
        return res.json(clothing);
        
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page, searchName, sort} = req.query;
            page = page || 1
            limit = limit || 12
            let offset = page * limit - limit
            let clothing = {};
            if(typeId === 0){
                typeId = false;
            }
            let sorting
            switch (sort) {
                case "1":
                    sorting = {name:'rating',type:'ASC'}
                    break;
                case "2":
                    sorting = {name:'rating',type:'DESC'}
                    break;
                case "3":
                    sorting = {name:'price',type:'ASC'}
                    break;
                case "4":
                    sorting = {name:'price',type:'DESC'}
                    break;
                default:
                    sorting = {name:'name', type:'ASC'}
                    break;
            }
            if (!brandId && !typeId) {
                clothing = await Phones.findAndCountAll({
                    order:[[sorting.name,sorting.type]],
                    where:{
                        name: { [Sequelize.Op.substring]: searchName },
                    },
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (brandId && typeId) {
                clothing = await Phones.findAndCountAll({
                    order:[[sorting.name,sorting.type]],
                    where:{
                        brandId,
                        typeId,
                        name: { [Sequelize.Op.substring]: searchName },
                    },
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (!brandId && typeId) {
                clothing = await Phones.findAndCountAll({
                    order:[[sorting.name,sorting.type]],
                    where:{
                        typeId,
                        name: { [Sequelize.Op.substring]: searchName },
                    },
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (brandId && !typeId) {
                clothing = await Phones.findAndCountAll({
                    order:[[sorting.name,sorting.type]],
                    where:{
                        brandId,
                        name: { [Sequelize.Op.substring]: searchName },
                    },
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }

            return res.json(clothing)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllPhonesByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "All") {
                const clothing =  await Phones.findAndCountAll({
                    attributes: ["name", "price", "img", "id"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(clothing);
            } else {
                const clothing =  await Phones.findAndCountAll({
                    attributes: ["name", "price", "img", "id", "brandId", "typeId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    brandId: null,
                                },
                                {
                                    typeId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(clothing);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            let clothing = await Phones.findOne({
                where: {id},
                include: [
                    {model: PhonesInfo, as: 'info'},
                    {model: Type},
                    {model: Brand},
                ]
            });
            return res.json(clothing);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Phones.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Phones.destroy({where:{id}}).then(() => {
                            return res.json("Phones deleted");
                        })
                    } else {
                        return res.json("This phones doesn't exist in DB");
                    }

                    await OrderPhones.destroy({where:{phonesId: id}})
                    await BasketPhones.destroy({where:{phonesId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {brandId, typeId, name, price, info} = req.body;

            Phones.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        brandId ? newVal.brandId = brandId : false;
                        typeId ? newVal.typeId = typeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        // if(info) {
                        //     const infos= JSON.parse(info);
                        //     if(infos.length == 0)
                        //     {
                        //         PhonesInfo.destroy(

                        //             {
                        //                 where:
                        //                     {
                        //                         phoneId: id
                        //                     }
                        //             }
                        //         );
                        //     }
                        //     infos.forEach(i =>
                        //         updateOrCreate(
                        //             PhonesInfo,
                        //             { phoneId : id },
                        //             { phoneId : id, title:i.title, description:i.description}
                        //         )
                        //     )}
                        if(info) {
                            const infos= JSON.parse(info);
                             PhonesInfo.destroy(
                                { where: { phoneId: id }}
                            );
                            infos.forEach(i =>
                                PhonesInfo.create({
                                    phoneId: id,
                                    title:i.title,
                                    description:i.description
                                })

                            )}

                        await Phones.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Phones changed");
                        })
                    } else {
                        return res.json("This phones doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new PhonesController();
