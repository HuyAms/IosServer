const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
}

const apiError = (message, status) => {
  return new APIError(message, status);
}

/*Code 400*/
const badRequestError = (message = 'Invalid params') => {
  return new APIError(message, httpStatus.BAD_REQUEST);
}

/*Code 401*/
const unauthorizedError = (message = 'Unauthorize') => {
  return new APIError(message, httpStatus.UNAUTHORIZED);
}


/*Code 404*/
const notFoundError = (message = 'Not found') => {
  return new APIError(message, httpStatus.NOT_FOUND);
}

/*Code 500*/
const internalServerError = (message = 'Unexpected database error') => {
  return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
}

module.exports = {
  APIError,
  internalServerError,
  notFoundError,
  unauthorizedError,
  badRequestError,
  apiError
}
