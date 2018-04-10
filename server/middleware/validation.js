const error = require('../util/error');
const mongoose = require('mongoose');

exports.validateUserParam = (req, res, next) => {
  req.checkBody('username', 'Username should not be empty').notEmpty();
  req.checkBody('password', 'Password should not be empty').notEmpty();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('phoneNumber', 'Invalid phone number').
      notEmpty().
      isLength({min: 10, max: 10});

  const errors = req.validationErrors();
  if (errors) {
    switch (errors[0].param) {
      case 'username':
        next(error.badRequestError(errors[0].msg, 6));
      case 'password':
        next(error.badRequestError(errors[0].msg, 7));
      case 'email':
        next(error.badRequestError(errors[0].msg, 8));
      case 'phoneNumber':
        next(error.badRequestError(errors[0].msg, 9));
    }
  }
  next();
};

exports.validateItemParam = (req, res, next) => {
  req.checkBody('itemName', 'Item name should not be empty').notEmpty();
  req.checkBody('description', 'Description should not be empty').notEmpty();
  req.checkBody('imgPath', 'Item image path should not be empty').notEmpty();
  req.checkBody('price', 'Price should not be empty').notEmpty();
  req.checkBody('category', 'Invalid Category').
      notEmpty().
      isIn([
        'clothing',
        'homewares',
        'accessories',
        'devices',
        'others',
        'vehicles']);

  const errors = req.validationErrors();
  if (errors) {
    switch (errors[0].param) {
      case 'itemName':
        next(error.badRequestError(errors[0].msg, 1));
      case 'description':
        next(error.badRequestError(errors[0].msg, 2));
      case 'imgPath':
        next(error.badRequestError(errors[0].msg, 3));
      case 'price':
        next(error.badRequestError(errors[0].msg, 4));
      case 'category':
        next(error.badRequestError(errors[0].msg, 5));
    }
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
      next(error.badRequestError('Invalid item id'));
    }
  }
  next();

};