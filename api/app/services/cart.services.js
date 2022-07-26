const RPCClient = require("../../engines/rpc-client,js");
const dependencies = require('../../dependencies/api.dependencies')[process.env.NODE_ENV];
const Response = require('../../entities/response.entity');

module.exports = class CartService {
  constructor() {
    const { rpcClients: { cartClient, productClient } } = dependencies;

    this.client = new RPCClient(cartClient).getClient();
    this.productClient = new RPCClient(productClient).getClient();
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
      .then(async (resp) => {
        const updatedCartResponse = await this.getCartProducts(resp)

        if (updatedCartResponse.IsError)
          return updatedCartResponse;
        else
          return updatedCartResponse.result;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  getByUserId = async (userId) => {
    const response = new Response();

    return this.client.getByUserId(userId)
      .then(async resp => {
        const updatedCartResponse = await this.getCartProducts(resp)

        if (updatedCartResponse.IsError)
          return updatedCartResponse;
        else
          return updatedCartResponse.result;

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

    return this.client.calculate({ id })
      .then(async resp => {
        console.log(resp);
        const result = await this.getCartProducts(resp.cart)

        return result.result;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  removeProduct(ProductExclusion) {
    const response = new Response();

    return this.client.removeProduct({ ...ProductExclusion })
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  updateCartsPrices(newPrice) {
    const response = new Response();

    return this.client.updateCartsPrices(newPrice)
      .then(resp => {
        return resp;

      }).catch((error) => {
        response.setError(error);
        return response.result;
      });
  }

  async getCartProducts(cart) {
    const response = new Response();
    return Promise.all(
      cart.products.map(prod => this.productClient.getById({ id: prod.productId }))
    )
      .then(result => {
        result.forEach(el => {
          const index = cart.products.map((product) => product.productId).indexOf(el._id)

          if (index >= 0) {
            cart.products[index]['description'] = el.description;
            cart.products[index]['inventory'] = el.quantity;
          }
        })

        response.setResult(cart)
        return response;
      })
      .catch(error => response.setResult(error))

  }
}