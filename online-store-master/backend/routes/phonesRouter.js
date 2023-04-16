const Router = require('express');
const router = new Router();
const phonesController = require('../controllers/phonesController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', phonesController.create)
    .get('/getAll', phonesController.getAllAn)
    .get('/', phonesController.getAll)
    .get('/search', phonesController.getSearchAllPhonesByName)
    .get('/:id', phonesController.getOne)
    .delete('/:id', checkRole("ADMIN"), phonesController.delete)
    .put('/:id', checkRole("ADMIN"), phonesController.update)

module.exports = router;
