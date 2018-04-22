const router = require('express').Router();
const controller = require('./voucherController');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
.get(controller.get)
.post(controller.post)

module.exports = router;