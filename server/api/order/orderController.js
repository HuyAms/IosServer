const Order = require('./orderModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');

exports.post = (req, res, next) => {
  const newOrder = {};
  newOrder.item = req.item._id;
  newOrder.seller = req.item.seller._id;
  newOrder.buyer = req.user._id;

  Order.create(newOrder).exec().then((order) => {
    res.json(responseHandler.successResponse(order));
  }, (err) => {
    console.log(err);
    next(error.internalServerError());
  });

};
