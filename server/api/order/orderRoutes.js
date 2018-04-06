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
    orderMiddleware.processBuyerDell,
    orderMiddleware.updateItemStatus
];

router.route('/')
.post(checkUser, validator.validateOrderParam, processOrder, controller.post);

module.exports = router;
