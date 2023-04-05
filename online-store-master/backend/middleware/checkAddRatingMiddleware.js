const {Rating, Phones} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {phonesId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({where: {phoneId : phonesId, userId: user.id}});
        const checkPhones =  await Phones.findOne({where: {id: phonesId}});

        if (!checkPhones) {
            return res.json("Product doesn't existing in data base");
        } else if(checkRating && checkPhones) {
            return res.json("You have left a rating for this product");
        }
        req.user = user;
        return next();
    } catch (e) {
        console.log(e.message)
        return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
    }
};

