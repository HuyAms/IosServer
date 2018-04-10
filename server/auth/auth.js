const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({secret: config.secrets.jwt});
const User = require('../api/user/userModel');
const error = require('../util/error');
const httpStatus = require('http-status');


exports.decodeToken = () => {
  return (req, res, next) => {
    let formattedToken;
    //If found token in query then place it in the header
    if (req.query && req.query.hasOwnProperty('access_token')) {
      formattedToken = 'Bearer ' + req.query.access_token;
      req.headers.authorization = formattedToken;
    }

    formattedToken = 'Bearer ' +  req.headers.authorization;
    req.headers.authorization = formattedToken;

    //call next if token is valid
    //send error if token is invalid, then attached the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id).then((user) => {
      //Cannot find user with that id
      if (!user) {
        next(error.badRequestError('Cannot find user with that id'))
      } else {
        //update req.user with fresh user from database
        req.user = user;
        next();
      }
    }, (err) => {
      next(error.badRequestError('Cannot find user with that id'))
    });
  };
};

exports.verifyUser = () => {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    //if no username or password then send
    if (!username || !password) {
      next(error.badRequestError());
      return;
    }

    //look user up in the FB so we can check if the passwords match
    //for the username
    User.findOne({username: username}).then((user) => {
      if (!user) {
        next(error.badRequestError('Username has not existed', 17))
      } else {
        if (!user.authenticate(password)) {
          next(error.unauthorizedError('Password is not correct', 18))
        } else {
          //if everything is ok
          //attach to req.user
          //and call next so the controller
          //can sign a token from the req.user._id
          req.user = user;
          next();
        }
      }
    }, (err) => {
      next(error.notFoundError('Cannot find user with that username'))
    });
  };
};

//util method to sign tokens on signup
exports.signToken = (id) => {
  return jwt.sign(
      {_id: id},
      config.secrets.jwt,
      {expiresIn: config.expireTime}
  );
};

