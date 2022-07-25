const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')[process.env.NODE_ENV];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { productClient } } = dependencies;
    const { rpcClients: { cartClient } } = dependencies;

    this.client = new RPCClient(productClient).getClient();
    this.cartClient = new RPCClient(cartClient).getClient();

  }

  ping = () => {
    const response = new Response();

    return this.client.ping({}).then(
      (resp) => {
        return resp;
      })
      .catch((error) => {
        response.setError(error)
        return response.result;
      });

  }


  getById = async (id) => {
    const response = new Response();

    return this.client.getById(id)
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  getAll() {
    const response = new Response();

    return this.client.getAll({})
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  updatePrice(item) {
    const response = new Response();

    return this.client.updatePrice(item)
      .then(async (resp) => {
        const { id: productId, price } = item;
        const cartResp =
          await this.cartClient.updateCartsPrices({ productId, price })

        return { ...resp, ...cartResp};

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

}