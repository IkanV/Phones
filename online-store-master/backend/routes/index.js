const Router = require('express');
const router = new Router();
const phonesRouter = require('./phonesRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');
const ordersRouter = require('./ordersRouter');
const chatRoomsRouter = require('./chatRoomsRouter');
const stripe = require('./stripe');

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/phones', phonesRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)
router.use('/orders', ordersRouter)
router.use('/chat', chatRoomsRouter)
router.use('/create-checkout-session', stripe)

module.exports = router;
