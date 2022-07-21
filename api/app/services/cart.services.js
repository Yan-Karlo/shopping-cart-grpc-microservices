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

  create = async (cart) => {
    const response = new Response();
    return this.client.create({ ...cart }).then(
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

  getByUserId = async (userId) => {
    const response = new Response();
    console.log(JSON.stringify({userId}, null, 4))
    return this.client.getByUserId(userId)
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  addItem(cartId, product) {
    const response = new Response();

    return this.client.addItem({
      cartId,
      product
    })
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  addCoupon(cartId, coupon) {
    const response = new Response();

    return this.client.addCoupon({
      cartId,
      coupon
    })
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  qtyUpdate(itemUpdate) {
    const response = new Response();

    return this.client.qtyUpdate(itemUpdate)
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  calculate(id) {
    const response = new Response();

    return this.client.calculate({id})
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }

  removeItem(itemExclusion) {
    const response = new Response();

    return this.client.removeItem({...itemExclusion})
      .then(resp => {
        response.setResult(resp);
        return response;

      }).catch((error) => {
        response.setError(error);
        return response;
      });
  }
}