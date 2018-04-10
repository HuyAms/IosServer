const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, code) {
    super(message);
    this.code = code;
    this.message = message;
    this.status = status;
  }
}

class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, code = 0) {
    super(message, status, code);
  }
}

const apiError = (message, status, code) => {
  return new APIError(message, status, code);
}

/*Code 400*/
const badRequestError = (message = 'Invalid params', code = 0) => {
  return new APIError(message, httpStatus.BAD_REQUEST, code);
}

/*Code 401*/
const unauthorizedError = (message = 'Unauthorize', code = 0) => {
  return new APIError(message, httpStatus.UNAUTHORIZED, code);
}


/*Code 404*/
const notFoundError = (message = 'Not found', code = 0) => {
  return new APIError(message, httpStatus.NOT_FOUND, code);
}

/*Code 415*/
const unsupportedMediaTypeError = (message = 'Invalid photo type', code = 0) => {
  return new APIError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE, code);
}

/*Code 500*/
const internalServerError = (message = 'Unexpected database error', code = 0) => {
  return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR, code);
}

module.exports = {
  APIError,
  internalServerError,
  notFoundError,
  unauthorizedError,
  badRequestError,
  apiError,
  unsupportedMediaTypeError
}
