const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')['development'];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { cartClient } } = dependencies;

    this.client = new RPCClient(cartClient).getClient();
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

  clean = async (id) => {
    const response = new Response();

    return this.client.clean({ id }).then(
      (resp) => {
        return resp;
      })
      .catch((error) => {
        response.setError(error)
        return response.result;
      });

  }

  create = async (cart) => {
    const response = new Response();
    return this.client.create({ ...cart }).then(
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

    return this.client.getById({ id })
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  getByUserId = async (userId) => {
    const response = new Response();
    console.log(JSON.stringify({userId}, null, 4))
    return this.client.getByUserId(userId)
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  addProduct(cartId, product) {
    const response = new Response();

    return this.client.addProduct({
      cartId,
      product
    })
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  addCoupon(cartId, coupon) {
    const response = new Response();

    return this.client.addCoupon({
      cartId,
      coupon
    })
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  qtyUpdate(itemUpdate) {
    const response = new Response();

    return this.client.qtyUpdate(itemUpdate)
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  calculate(id) {
    const response = new Response();

    return this.client.calculate({id})
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  removeProduct(ProductExclusion) {
    const response = new Response();

    return this.client.removeProduct({...ProductExclusion})
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }
}