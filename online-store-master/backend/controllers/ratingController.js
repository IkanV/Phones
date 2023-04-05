const {Rating, Phones} = require('./../models/models');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, phonesId} = req.body;
            const user = req.user;
            await Rating.create({rate, phoneId : phonesId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    phoneId : phonesId
                },
            });

            let allRating = 0;
            let middleRating;
            rating.rows.forEach(item => allRating += item.rate);
            middleRating = Number(allRating) / Number(rating.count);

            await Phones.update(
                {rating: middleRating},
                {where: {id: phonesId}}
            );

            return res.json("Rating success added");
        } catch (e) {
            console.error(e);
        }
    }

    async checkRating(req, res) {
        try {
            const {phonesId} = req.body;
            const user = req.user;
            const checkRating = await Rating.findOne({where: {phoneId : phonesId, userId: user.id}});
            const checkClothing = await Phones.findOne({where: {id: phonesId}});
            if (!checkClothing) {
                return res.json({allow: false});
            } else if(checkRating && checkClothing) {
                return res.json({allow: false});
            }
            return res.json({allow: true});
        } catch (e) {
            console.log(e.message)
            return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
        }
    }
}

module.exports = new RatingController();
