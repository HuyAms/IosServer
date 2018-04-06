const User = require('./userModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');
const signToken = require('../../auth/auth').signToken;

exports.params = (req, res, next, id) => {
  User.findById(id)
  .select('-password')
  .exec()
  .then((user) => {
    if (!user) {
      next(error.notFoundError('Cannot find user with that id'));
    } else {
      req.user = user;
      next();
    }
  }, (err) => {
    next(error.notFoundError('Cannot find user with that id'));
  });
};

exports.get = (req, res, next) => {
  User.find({})
  .select('-password -email -phoneNumber')
  .exec()
  .then((users) => {
    res.json(responseHandler.successResponse(users.map((user) => { return user})));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.getOne = (req, res, next) => {
  const user = req.user;
  delete user.password
  res.json(responseHandler.successResponse(user));
};


exports.me = (req, res, next) => {
  const me = req.user
  delete me.password
  res.json(req.user);
};


exports.updateMe = (req, res, next) => {
  const user = req.user;

  const update = req.body;

  if (req.body.point) {
    next(error.badRequestError("User cannot update point"));
  } else {
    _.merge(user, update);

    user.save((err, saved) => {
      if (err) {
        next(error.badRequestError(_.find(err.errors).message));
      } else {
        delete saved.password
        res.json(responseHandler.successResponse(saved));
      }
    });
  }
};

exports.post = (req, res, next) => {
  const newUser = req.body;
  User.create(newUser).then((user) => {
    const token = signToken(user._id);
    res.json({token: token});
  }, (err) => {
   next(error.badRequestError(_.find(err.errors).message));
  });
};

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      delete removed.password
      res.json(responseHandler.successResponse(removed));
    }
  });
};
