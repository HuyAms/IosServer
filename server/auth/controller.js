const responseHandler = require('../util/responseHandler');

const signToken = require('./auth').signToken;

exports.signin = (req, res, next) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user._id);
  res.json(responseHandler.successResponse(
    {
      token: token,
      userId: req.user._id
    }
  ));
}
