const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/me')
.get(checkUser, controller.me)
.put(checkUser, controller.updateMe)

router.route('/')
.get(controller.get)
.post(validator.validateUserParam, controller.post);

router.route('/:id')
.get(controller.getOne)

module.exports = router;