const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./itemController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');


router.param('id', controller.params);

router.route('/')
.get(controller.get)
.post(checkUser, validator.validateItemParam, controller.post);

router.route('/filter')
.get(controller.getItemFilter)


router.route('/:id')
.get(controller.getOne)
.put(checkUser, validator.validateItemParam, controller.put)
.delete(checkUser, controller.delete);

module.exports = router;
