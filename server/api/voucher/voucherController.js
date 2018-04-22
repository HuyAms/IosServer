const Voucher = require('./voucherModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');


exports.get = (req, res, next) => {
  Voucher.find({})
  .then((vouchers) => {
    res.json(responseHandler.successResponse(vouchers));
  }, (err) => {
    next(error.internalServerError(err.message));
  });
};

exports.post = (req, res, next) => {
  const newVoucher = req.body;
  Voucher.create(newVoucher).then((voucher) => {
    res.json(responseHandler.successResponse(voucher));
  }, (err) => {
    next(error.internalServerError(err.message));
  });
};