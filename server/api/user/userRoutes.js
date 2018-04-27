const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');

router.param('id', controller.params);

router.route('/me')
.get(checkUser, controller.me)
.put(checkUser, validator.validateUpdateUserParam, controller.updateMe)

router.route('/')
.get(controller.get)
.post(validator.validateUserParam, controller.post);

router.route('/top')
.get(controller.getTop)

router.route('/:id')
.get(controller.getOne)

module.exports = router;
