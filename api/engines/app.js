process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const Server = require('./server');
const dependencies = require('../dependencies/api.dependencies')[process.env.NODE_ENV];
module.exports = class App {
  constructor() {
    console.log('Environment:' + process.env.NODE_ENV);
    this.environment = process.env.NODE_ENV;
    this.server = new Server(dependencies.port);
  }

  start() {
      this.server.start();
  }

  stop() {
    this.server.stop();
  }
}