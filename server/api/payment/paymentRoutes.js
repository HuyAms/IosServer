const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./paymentController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];


router.route('/')
.post(checkUser, controller.post);

router.route('/ephemeral_keys')
.post(checkUser, controller.createEphemeralKey);

module.exports = router;
