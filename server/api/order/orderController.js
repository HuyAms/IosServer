const Order = require('./orderModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');



exports.post = (req, res, next) => {
  const newOrder = {};
  newOrder.item = req.item._id;
  newOrder.seller = req.item.seller._id
  newOrder.buyer = req.user._id

  Order.create(newOrder).then((order) => {
    order.populate('item seller buyer').exec()
    res.json(responseHandler.successResponse(order));
  }, (err) => {
    next(error.internalServerError());
  });

  console.log(newOrder)

};
