const router = require('express').Router();
const controller = require('./songsController');

router.route('/')
.get(controller.get)

module.exports = router;
