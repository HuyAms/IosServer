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
  .select('-password')
  .exec()
  .then((users) => {
    res.json(responseHandler.successResponse(users.map((user) => {return user.toJson()})));
  }, (err) => {
    next(error.internalServerError());
  });
};

exports.getOne = (req, res, next) => {
  const user = req.user.toJson();
  res.json(responseHandler.successResponse(user.toJson()));
};


exports.me = (req, res, next) => {
  res.json(req.user.toJson());
};


exports.updateMe = (req, res, next) => {
  const user = req.user;

  const update = req.body;

  _.merge(user, update);

  user.save((err, saved) => {
    if (err) {
      next(error.badRequestError('This username has been used'));
    } else {
      res.json(responseHandler.successResponse(saved.toJson()));
    }
  });
};

exports.post = (req, res, next) => {
  const newUser = req.body;
  User.create(newUser).then((user) => {
    const token = signToken(user._id);
    res.json({token: token});
  }, (err) => {
    console.log(err)
    next(error.badRequestError('This username has been used'));
  });
};

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(error.internalServerError());
    } else {
      res.json(responseHandler.successResponse(removed.toJson()));
    }
  });
};
