const {Orders, OrderPhones, Phones, Brand, Type} = require('./../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')

class OrdersController {
    async create(req, res, next) {
        const auth = req.headers.authorization || "";
        const {mobile, basket} = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty())
         {    return next(ApiError.badRequest('Validation error', errors.array()))}
        if (!mobile) {
            return next(ApiError.badRequest('Not valid mobile'));
        }
        try {
            let parseClothing = [];
            for (let key of basket) {
                parseClothing.push(key.id)
            }

            const isPhonesInDB = await Phones.findAndCountAll({
                where: {id: parseClothing},
                attributes: ["id"]
            });

            if(isPhonesInDB.count === parseClothing.length) { //if all phones was found in DB
                const row = {mobile};
                if(auth) {
                    const token = auth.split(' ')[1];
                    const {id} = jwt.verify(token, process.env.SECRET_KEY);
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const {id} = order.get();
                    parseClothing.forEach( async (phonesId, i) =>  {

                        await OrderPhones.create({
                            orderId: id,
                            phonesId,
                            count: basket[i].count
                        });
                    });
                });
            } else { //send msg about phones that didnt found in DB
                const notFoundIdClothing = [];
                const arrClothing = []; //found id
                isPhonesInDB.rows.forEach(item => arrClothing.push(item.id));
                parseClothing.forEach(phonesId => {
                    if(!arrClothing.includes(phonesId)) {
                        notFoundIdClothing.push(phonesId);
                    }
                });
                return ApiError.badRequest(res.json(`Some clothing of id(${notFoundIdClothing.join(', ')}) not exist in DB`));
            }

            return res.json("Thank you for you order! We will contact you shortly");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const { complete, id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.update({complete}, {where:{id}} ).then(() => {
                            return res.json("Order updated");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Updated didn't complete because was error: " + e);
        }

    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.destroy({where:{id}}).then(() => {
                            return res.json("Order deleted");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }

    async getAll(req, res) {
        let {limit, page, complete} = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let clothing;
        if(complete === "not-completed") {
            clothing = await Orders.findAndCountAll({where:{complete: false}, limit, offset});
        } else if(complete === "completed") {
            clothing = await Orders.findAndCountAll({where:{complete: true}, limit, offset});
        } else {
            clothing = await Orders.findAndCountAll({limit, offset});
        }

        return res.json(clothing);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let clothing;
            let infoClothing = [];
            await Orders.findOne({where:{id}}).then(async data => {
                order.descr = data;
                clothing = await OrderPhones.findAll({
                    attributes: ["phonesId", "count"],
                    where:{orderId: data.id},
                });

                for (let phones of clothing) {
                    await Phones.findOne({
                        attributes: ["name", "img", "price"],
                        where: {id: phones.phonesId},
                        include: [
                            {
                                attributes: ["name"],
                                model: Type
                            },
                            {
                                attributes: ["name"],
                                model: Brand
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: phones.count
                        }
                        infoClothing.push(newObj);
                    });
                }
                order.clothing = infoClothing;

                return res.json(order);
            }).catch(() => {
                return res.json("Order doesn't exist in data base");
            });

        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }
}

module.exports = new OrdersController();
