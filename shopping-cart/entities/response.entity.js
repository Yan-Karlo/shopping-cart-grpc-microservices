const grpc = require('grpc');

module.exports = class Response {
  constructor() {
    this.isError = false;
    this.result = {};
  }

  setError(error) {
    this.result = {
      code: error.code,
      message: error.details || error.message
    }
    this.isError = true;
  }

  setResult(result) {
    this.result = result;
  }
}