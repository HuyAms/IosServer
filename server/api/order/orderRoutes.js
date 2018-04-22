const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./orderController');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const validator = require('../../middleware/validation');
const orderMiddleware = require('../../middleware/orderMiddleware');

const processOrder = [
    orderMiddleware.verifyItem,
    orderMiddleware.verifyBuyerPurchase,
    orderMiddleware.processSellerDeal,
    orderMiddleware.processBuyerDeal,
    orderMiddleware.updateItemStatus
];

const processVoucherOrder = [
    orderMiddleware.verifyVoucher,
    orderMiddleware.processBuyerDeal
]

router.route('/items/:itemId')
.post(checkUser, validator.validateOrderParam, processOrder, controller.postItemOrder);

router.route('/vouchers/:voucherId')
.post(checkUser, validator.validateVoucherOrderParam, processVoucherOrder, controller.postVoucherOrder);

router.route('/me/buyer')
.get(checkUser, controller.getMeBuyerOrder)

router.route('/me/seller')
.get(checkUser, controller.getMeSellerOrder)

router.route('/me/vouchers')
.get(checkUser, controller.getMeVoucherOrder)

router.route('/:id')
.get(controller.getOneOrder)

module.exports = router;
