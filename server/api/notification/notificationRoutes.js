const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./notificationController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/').get(checkUser, controller.get);

router.route('/:id').put(checkUser, controller.put);

module.exports = router;