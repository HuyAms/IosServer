const successResponse = (data) => {
  return {
    'status': 200,
    'data': data,
  };
};

const failureResponse = (statusCode, description, code) => {
  return {
    'status': statusCode,
    'code': code,
    'description': description
  }
}

module.exports = {
  successResponse,
  failureResponse
};
