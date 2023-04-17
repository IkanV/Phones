const Router = require('express');
const router = new Router();
const {body} = require('express-validator');

const ordersController = require('./../controllers/ordersController');
const checkRole = require('./../middleware/checkRoleMiddleware');

router
    .post('/', body('phone')
    .custom((val) => {
        if (!val.match('^[+][0-9]{1,4}[\\]([0-9]{1,4}[)][0-9]{3}[-][0-9]{2}[-][0-9]{2}')) {
            throw new Error("invalid phone number")
        } else {
            return val
        }
    }), ordersController.create)
    .get('/', checkRole("ADMIN"), ordersController.getAll)
    .get('/:id', checkRole("ADMIN"), ordersController.getOne)
    .put('/', checkRole("ADMIN"), ordersController.updateOrder)
    .delete('/', checkRole("ADMIN"), ordersController.deleteOrder);


module.exports = router;
