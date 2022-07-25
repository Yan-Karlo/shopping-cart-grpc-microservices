process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const Database = require('./database.engine');
const RpcServer = require('./rpcserver.engine');
const dependencies = require('../dependencies/server.dependencies')[process.env.NODE_ENV];



module.exports = class App {
  constructor() { }

  async start() {
    new Database().start().then(() => {
      new RpcServer(dependencies.url).start()
    })
    .catch(console.log);
  }
}
