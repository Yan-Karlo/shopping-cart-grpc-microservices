const grpc = require('grpc');

module.exports = class Response {
  constructor() {
    this.isError = false;
    this.result = {};
    this.httpStatus = 200;
  }

  setError(error) {
    this.result = {
      code : error.code,
      message : error.details || error.message
    }
    this.httpStatus = this.getHTTPStatus(error.code),
    this.isError = true;
  }

  setResult(result) {
    this.result = result;
  }

  getHTTPStatus(grpc_code) {
    const index = {}
    index[grpc.status.ALREADY_EXISTS] = 400
    index[grpc.status.ABORTED] = 500
    index[grpc.status.CANCELLED] = 500
    index[grpc.status.DATA_LOSS] = 500
    index[grpc.status.INTERNAL] = 500
    index[grpc.status.NOT_FOUND] = 404
    index[grpc.status.INVALID_ARGUMENT] = 400
    index[grpc.status.OK] = 200
    index[grpc.status.UNKNOWN] = 500
    index[grpc.status.PERMISSION_DENIED] = 403
    index[grpc.status.UNIMPLEMENTED] = 404
    index[grpc.status.UNAUTHENTICATED] = 401

    if (Object.keys(index).indexOf(grpc_code.toString()) > -1)
      return index[grpc_code];
    else
      return 500;
  }
}