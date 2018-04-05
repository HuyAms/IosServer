const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/items', require('./item/itemRoutes'));

module.exports = router;