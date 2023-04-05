const Router = require('express');
const router = new Router();
const userController = require('./../controllers/userController');
const authMiddleware = require('./../middleware/authMiddleware');
const {body} = require('express-validator');

router
    .post('/registration',
        body('password', 'Invalid password length').isLength({min: 4, max: 15}).isString(),
        body('email', 'Invalid email').isEmail(), 
        userController.registration)
    .post('/login', userController.login)
    .get('/auth', authMiddleware, userController.check);

module.exports = router;
