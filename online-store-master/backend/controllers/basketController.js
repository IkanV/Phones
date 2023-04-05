const {Basket, BasketPhones, Phones, PhonesInfo} = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class BasketController {
    async addPhones(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const basket = await Basket.findOne({where: {userId: user.id}});
            await BasketPhones.create({basketId : basket.id, phonesId: id});
            return res.json("Product added in card");
        } catch (e) {
            console.error(e);
        }
    }

    async getPhones(req, res) {
        try {
            const user = req.user;
            const {id} = await Basket.findOne({where: {userId: user.id}});
            const basket = await BasketPhones.findAll({where: {basketId: id}});

            const basketArr = [];
            for(let i = 0; i < basket.length; i++) {
                const basketPhones = await Phones.findOne({
                        where: {
                            id: basket[i].phonesId,

                        },
                        include: {
                            model: PhonesInfo, as: "info",
                            where: {
                                phoneId: basket[i].phonesId,
                                [Op.or]: [
                                    {
                                        phoneId: {
                                            [Op.not]: null
                                        }
                                    }
                                ],
                            },
                            required: false}
                        });
                basketArr.push(basketPhones);
            }

            return res.json(basketArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deletePhones(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Basket.findOne({where: {userId: user.id}}).then(async userBasket => {
                if(userBasket.userId === user.id) {
                    await BasketPhones.destroy({where: {basketId: userBasket.id, phonesId: id}})
                }else
                return res.json(`You haven't access for delete the phones(${id}) from basket that didn't belong to you`);
            });
            return res.json("Product deleted form your card");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new BasketController();
