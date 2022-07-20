const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')['development'];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { productClient } } = dependencies;

    this.client = new RPCClient(productClient).getClient();
  }

  ping = () => 'pong';

  getById = async (id) => {
    const response = new Response();

    return this.client.getById(id)
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  getAll() {
    const response = new Response();

    return this.client.getAll({})
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  updatePrice(item) {
    const response = new Response();

    return this.client.updatePrice(item)
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

}