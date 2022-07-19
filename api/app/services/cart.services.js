const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')['development'];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { cartClient } } = dependencies;

    this.client = new RPCClient(cartClient).getClient();
  }

  ping = () => 'pong';

  getById = async (id) => {
    const response = new Response();

    await this.client.getById({ id }).then(resp => {
      response.setResult(resp);
    }).catch((error) => {
      console.log(JSON.stringify(error, null, 4))
      response.setError(error);
    });

    return response
  }
}