const error = require('../../util/error');
const responseHandler = require('../../util/responseHandler');
const config = require('../../config/config');
const stripeSecretKey = config.secrets.stripeSecretKey;
const stripe = require('stripe')(stripeSecretKey);

exports.post = (req, res, next) => {
  const amount = req.body.amount * 100; //eur
  const addedPoint = req.body.amount * 5;
  const user = req.user;
  const source = req.body.source

  stripe.charges.create({
    amount: amount,
    currency: "eur",
    source: source,
    customer: user.stripeCustomerId,
    description: `Charge for ${user.username}`
  }).then(charge => {
    user.point += addedPoint;

    user.save((err, saved) => {
      if (err) {
        next(error.internalServerError());
      } else {
        delete saved.password;
        res.json(responseHandler.successResponse(saved));
      }
    });
  }).catch(err => {
    console.log(err)
    next(error.internalServerError( `${err.message}`));
  });
};

exports.createEphemeralKey = (req, res, next) => {
  const stripe_version = req.body.api_version;
  if (!stripe_version) {
    next(error.internalServerError(
        `Error empty api version`));
    return;
  }
  console.log("CUSTOMER ID: ", req.user.username)

  console.log("CUSTOMER ID: ", req.user.stripeCustomerId)

  stripe.ephemeralKeys.create(
      {customer: req.user.stripeCustomerId},
      {stripe_version: stripe_version}
  ).then((key) => {
    res.json(responseHandler.successResponse({ephemeralKey: key}));
  }).catch((err) => {
    //console.log(err)
    next(error.internalServerError(
        `Error creating ephemeral key for customer: ${err.message}`));
  });
};