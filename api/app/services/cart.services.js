const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')['development'];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { cartClient } } = dependencies;

    this.client = new RPCClient(cartClient).getClient();
  }

  ping = () => 'pong';

  clean = async (id) => {
    const response = new Response();

    return this.client.clean({ id }).then(
      (resp) => {
        response.setResult(resp);
        return response;
      })
      .catch((error) => {
        response.setError(error)
        return response;
      });

  }

  getById = async (id) => {
    const response = new Response();

    return this.client.getById({ id })
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }
}