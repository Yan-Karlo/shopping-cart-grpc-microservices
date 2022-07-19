const Database = require('./database.engine');
const RpcServer = require('./rpcserver.engine');
const dependencies = require('../dependencies/server.dependencies');



module.exports = class App {
  constructor() { }

  async start() {
    new Database().start().then(() => {
      new RpcServer('127.0.0.1:3001').start()
    })
    .catch(console.log);
  }
}
