const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const seed = require('../seeding/seeding');
const dependencies = require('../dependencies/server.dependencies')[process.env.NODE_ENV];

module.exports = class RpcServerEngine{

  constructor(url) {
    this.url = url
    this.server = new grpc.Server();
    this.DefinePackage()
      .defineProtoBuf()
      .implementService()
      .bindServer();
    console.log('Implementation is done')
  }

  start = () => {
    console.log('Environment: '+ process.env.NODE_ENV)
    console.log('Product Server is starting...');
    this.server.start();
    console.log('Product Catalog Server is Running at '+ this.url);
    console.log('===================================')
    seed();
  }

  DefinePackage = ({ protoPath, protoOptions } = dependencies) => {
    console.log('===================================')
    console.log('Package definition ...');
    this.packageDefinition = protoLoader.loadSync(protoPath, protoOptions);
    return this;
  }

  defineProtoBuf() {
    console.log('Defining the protobuf...');
    this.proto = grpc.loadPackageDefinition(this.packageDefinition).product;
    return this;
  }

  implementService = ({ implementation } = dependencies) => {
    console.log('implementing the service...');
    this.server.addService(this.proto.ProductService.service, implementation);
    return this
  }

  bindServer({ url } = dependencies) {
    console.log('binding the server...');
    const creds = grpc.ServerCredentials.createInsecure();
    this.server.bind(url, creds);
    return this
  }
}