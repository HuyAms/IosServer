const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/items', require('./item/itemRoutes'));
router.use('/photos', require('./photo/photoRoutes'));
router.use('/orders', require('./order/orderRoutes'));

module.exports = router;