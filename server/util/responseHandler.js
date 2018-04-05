const successResponse = (data) => {
  return {
    'status': 200,
    'data': data,
  };
};

const failureResponse = (statusCode, description) => {
  return {
    'status': statusCode,
    'description': description
  }
}

module.exports = {
  successResponse,
  failureResponse
};
