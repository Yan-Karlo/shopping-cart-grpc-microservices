const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// const implementation = require('./implementation');
const dependencies = require('../dependencies/server.dependencies');

module.exports = class RpcServerEngine{

  constructor(url) {}

  start = () => {
    console.log('Server is running')
  }

  DefinePackage = () => {}

  defineProtoBuf() {
  }

  implementService = () => {}

  bindServer() { }
}