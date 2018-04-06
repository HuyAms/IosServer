const Order = require('./orderModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.post = (req, res, next) => {
  const newOrder = {};
  newOrder.item = req.item._id;
  newOrder.seller = req.item.seller._id;
  newOrder.buyer = req.user._id;

  Order.create(newOrder).then((order) => {
    res.json(responseHandler.successResponse(order));
  }, (err) => {
    console.log(err);
    next(error.internalServerError());
  });
};

exports.getMeSellerOrder = (req, res, next) => {
  let userId = req.user._id;
  Order.find({seller: userId}).
      populate('buyer', '_id username').
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
      populate('seller', '_id username').
      exec().
      then((items) => {
        res.json(responseHandler.successResponse(items));
      }, (err) => {
        next(error.internalServerError());
      });
};
