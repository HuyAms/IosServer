const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./photoController');
const upload = require('../../middleware/uploadPhoto');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
.post(checkUser, upload.single('photo'), controller.post);

module.exports = router;
