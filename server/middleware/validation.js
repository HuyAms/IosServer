const error = require('../util/error');

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