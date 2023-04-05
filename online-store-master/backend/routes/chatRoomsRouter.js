const Router = require('express');
const chatRoomController = require('../Controllers/chatRoomController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.get('/',checkRole('ADMIN'),chatRoomController.getAllList)
router.get('/:id',checkRole('ADMIN'),chatRoomController.getOne)



module.exports = router;