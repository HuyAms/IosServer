const router = require('express').Router();
const controller = require('./centerController');

router.route('/')
.get(controller.get)

module.exports = router;
