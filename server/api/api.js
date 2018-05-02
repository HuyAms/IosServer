const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/items', require('./item/itemRoutes'));
router.use('/photos', require('./photo/photoRoutes'));
router.use('/orders', require('./order/orderRoutes'));
router.use('/centers', require('./center/centerRoutes'));
router.use('/notifications', require('./notification/notificationRoutes'));
router.use('/payments', require('./payment/paymentRoutes'));
router.use('/vouchers', require('./voucher/voucherRoutes'));
router.use('/songs', require('./songs/songsRouters'));

module.exports = router;