const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeletePhonesFromBasket = require('./../middleware/checkDeletePhonesFromBasket');

router
    .post('/', authMiddleware, BasketController.addPhones)
    .get('/', authMiddleware, BasketController.getPhones)
    .delete('/:id', authMiddleware, checkDeletePhonesFromBasket, BasketController.deletePhones);

module.exports = router;
