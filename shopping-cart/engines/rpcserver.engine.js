const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// const implementation = require('./implementation');
const dependencies = require('../dependencies/server.dependencies')[process.env.NODE_ENV];

module.exports = class RpcServerEngine{

  constructor(url) {
    this.url = url
    this.server = new grpc.Server();
    this.DefinePackage()
      .defineProtoBuf()
      .implementService()
      .bindServer();
  }

  start = () => {
    console.log('Environment: '+ process.env.NODE_ENV)
    console.log('Shopping Cart Server is starting...');
    this.server.start();
    console.log('Shopping Cart Server is Running at '+ this.url);
    console.log('===================================')
  }

  DefinePackage = ({ protoPath, protoOptions } = dependencies) => {
    console.log('===================================')
    console.log('Package definition ...');
    this.packageDefinition = protoLoader.loadSync(protoPath, protoOptions);
    return this;
  }

  defineProtoBuf() {
    console.log('Defining the protobuf...');
    this.proto = grpc.loadPackageDefinition(this.packageDefinition).cart;
    return this;
  }

  implementService = ({ implementation } = dependencies) => {
    console.log('implementing the service...');
    this.server.addService(this.proto.CartService.service, implementation);
    return this
  }

  bindServer({ url } = dependencies) {
    console.log('binding the server...');
    const creds = grpc.ServerCredentials.createInsecure();
    this.server.bind(this.url, creds);
    return this
  }
}