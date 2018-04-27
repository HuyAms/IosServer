const User = require('./userModel');
const _ = require('lodash');
const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');
const signToken = require('../../auth/auth').signToken;

const config = require('../../config/config');
const stripeSecretKey = config.secrets.stripeSecretKey;
const stripe = require('stripe')(stripeSecretKey);

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
  res.json(responseHandler.successResponse(req.user));
};


exports.updateMe = (req, res, next) => {
  const user = req.user;

  const update = req.body;

  if (req.body.point) {
    next(error.badRequestError("User cannot update point"));
  } else if (req.body.badge) {
    next(error.badRequestError("User cannot update badge"));
  } else if (req.body.numberOfRecycledItems) {
    next(error.badRequestError("User cannot update number of recycled items"));
  } else {
    _.merge(user, update);

    user.save((err, saved) => {
      if (err) {
        let path = _.find(err.errors).message;
        if (path) {
          switch (path) {
            case 'username':
              next(error.badRequestError("This username has already been used", 14));
            case 'email':
              next(error.badRequestError("This email has already been used", 15));
            case 'phoneNumber':
              next(error.badRequestError("This phone number has already been used", 16));
          }
        } else {
          next(error.internalServerError());
        }
      } else {
        delete saved.password
        res.json(responseHandler.successResponse(saved));
      }
    });
  }
};

exports.getTop = (req, res, next) => {
  const limit = req.body.limit;
  User.find({})
  .select('-password -email -phoneNumber')
  .limit(limit)
  .sort({numberOfRecycledItems: -1})
  .exec()
  .then((users) => {
    res.json(responseHandler.successResponse(users.map((user) => { return user})));
  }, (err) => {
    next(error.internalServerError());
  });
}

exports.post = (req, res, next) => {
  const newUser = req.body;
  User.create(newUser)
  .then((user) => {
    return createKey(user)
  })
  .then((user) => {
    return saveUser(user)
  })
  .then((user) => {
    const token = signToken(user._id);
    res.json(responseHandler.successResponse({token: token}));
  })
  .catch(err => {
    let path = _.find(err.errors).message;
    if (path) {
      switch (path) {
        case 'username':
          next(error.badRequestError("This username has already been used", 14));
        case 'email':
          next(error.badRequestError("This email has already been used", 15));
        case 'phoneNumber':
          next(error.badRequestError("This phone number has already been used", 16));
      }
    } else {
      next(error.internalServerError());
    }
  })
}

const saveUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save().then((user) => {
      resolve(user)
    }).catch(error => reject(error))
  })
}

const createKey = (user) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      email: user.email,
      description: user.username
    }).then((customer) => {
      user.stripeCustomerId = customer.id
      resolve(user)
    }).catch(error => reject(error))
  })
}


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
