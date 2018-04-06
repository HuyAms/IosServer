const express = require('express');
const app = express();
const api = require('./api/api');
const error = require('./util/error');
const responseHandler = require('./util/responseHandler');
const mongoose = require('mongoose');
const config = require('./config/config');
const auth = require('./auth/routes');

//connect to mongoDB
mongoose.connect(config.db.url).then(() => {
  console.log('Connected successfully');
  if (config.seed) {
    require('./util/seed');
  }
}).catch((err) => {
  console.log('Cannot connect to database', err);
});

//setup the app middleware
require('./middleware/appMiddleware')(app);
app.use(express.static('public'));

//setup the api
app.use('/api/', api);
app.use('/auth/', auth);

//handle error
app.use((err, req, res, next) => {
  if (!(err instanceof error.APIError)) {
    console.log(err);
    const apiError = error.apiError(err.message || err.msg, err.status);
    console.log(apiError)
    next(apiError);
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).json(responseHandler.failureResponse(
      err.status,
      err.message,
  ));
});

//export the app for testing
module.exports = app;