const error = require('../util/error');
const mongoose = require('mongoose');


exports.validateUserParam = (req, res, next) => {
  req.checkBody('username', 'Username should not be empty').notEmpty();
  req.checkBody('password', 'Password should not be empty').notEmpty();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('phoneNumber', 'Invalid phone number').notEmpty().isLength({ min: 10, max: 10 });

  const errors = req.validationErrors();
  if (errors) {
    next(error.badRequestError(errors[0].msg));
  }
  next();
};

exports.validateItemParam = (req, res, next) => {
  req.checkBody('itemName', 'Item name should not be empty').notEmpty();
  req.checkBody('description', 'Description should not be empty').notEmpty();
  req.checkBody('imgPath', 'Image path should not be empty').notEmpty();
  req.checkBody('category', 'Invalid Category').notEmpty().isIn(['clothing','homewares','accessories', 'devices', 'others']);

  const errors = req.validationErrors();
  if (errors) {
    next(error.badRequestError(errors[0].msg));
  }
  next();
};

exports.validateOrderParam = (req, res, next) => {
  req.checkBody('itemId', 'Item id should not be empty').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    next(error.badRequestError(errors[0].msg));
  } else {
    const isValidItemId = mongoose.Types.ObjectId.isValid(req.body.itemId);
    if (!isValidItemId) {
      next(error.badRequestError("Invalid item id"));
    }
  }
  next();

}