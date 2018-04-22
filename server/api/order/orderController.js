const Order = require('./orderModel');
const VoucherOrder = require('./orderVoucherModel')
const Notification = require('../notification/notificationModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

  exports.postItemOrder = (req, res, next) => {
    const newOrder = {};
    newOrder.item = req.item._id;
    newOrder.seller = req.item.seller._id;
    newOrder.buyer = req.user._id;


    Order.create(newOrder)
    .then((order) => {

      const newBuyerNoti = {};
      newBuyerNoti.notiType = 1;
      newBuyerNoti.order = order._id;
      newBuyerNoti.user = order.buyer;
      newBuyerNoti.notiBody = order.seller;
      newBuyerNoti.item = order.item
      return createNoti(newBuyerNoti, order)
    })
    .then((order) => {
      const newSellerNoti = {};
      newSellerNoti.notiType = 2;
      newSellerNoti.order = order._id;
      newSellerNoti.user = order.seller;
      newSellerNoti.notiBody = order.buyer;
      newSellerNoti.item = order.item
      return createNoti(newSellerNoti, order)
    })
    .then((order) => {
      res.json(responseHandler.successResponse(order));
    })
    .catch(err => {
      console.log(err);
      next(error.internalServerError());
    });
  };

  const createNoti = (noti, order) => {
    return new Promise((resolve, reject) => {
      Notification.create(noti).then((noti) => {
        resolve(order);
      }, (err) => {
        reject(err);
      });
    });
  };

  exports.getOneOrder = (req, res, next) => {
    Order.find({_id: req.params.id}).
        populate('buyer', '_id username phoneNumber email').
        populate('seller', '_id username phoneNumber email').
        populate('item', 'itemName description price category').
        exec().
        then((items) => {
          res.json(responseHandler.successResponse(items));
        }, (err) => {
          next(error.internalServerError());
        });
  };

  exports.getMeSellerOrder = (req, res, next) => {
    let userId = req.user._id;
    Order.find({seller: userId}).
        populate('buyer', '_id username phoneNumber email').
        populate('item', 'itemName description price category').
        exec().
        then((items) => {
          res.json(responseHandler.successResponse(items));
        }, (err) => {
          next(error.internalServerError());
        });
  };

  exports.getMeBuyerOrder = (req, res, next) => {
    let userId = req.user._id;
    Order.find({buyer: userId}).
        populate('seller', '_id username phoneNumber email').
        populate('item', 'itemName description price category').
        exec().
        then((items) => {
          res.json(responseHandler.successResponse(items));
        }, (err) => {
          next(error.internalServerError(err.message));
        });
  };

  exports.getMeVoucherOrder = (req, res, next) => {
    let userId = req.user._id;
    VoucherOrder.find({buyer: userId}).
        select('-buyer').
        populate('voucher').
        exec().
        then((vouchers) => {
          res.json(responseHandler.successResponse(vouchers));
        }, (err) => {
          next(error.internalServerError(err.message));
        });
  }

  exports.postVoucherOrder = (req, res, next) => {
    const newVoucherOrder = {};
    newVoucherOrder.voucher = req.voucher._id;
    newVoucherOrder.buyer = req.user._id;
    VoucherOrder.create(newVoucherOrder).then((voucher) => {
      res.json(responseHandler.successResponse(voucher));
    }).catch(err => {
      next(error.internalServerError(err.message));
    })
  }
