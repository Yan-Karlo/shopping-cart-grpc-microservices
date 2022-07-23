const mongoose = require('mongoose');
const grpc = require('grpc');
const Response = require('../../entities/response.entity');
const CartModel = require('../../models/cart.model');
const CartCalculator = require('../../entities/cart-calculator.entity');

const isValidId = mongoose.Types.ObjectId.isValid

module.exports = {
  async ping(cart) {
    const response = new Response();
    response.setResult({ ping: 'pong' });
    return response;
  },

  async create(cart) {
    const response = new Response();
    const validCart = await new CartModel(cart);

    try {
      const oldCart = await CartModel.findOne({ 'userId': cart.userId });

      if (oldCart) {
        return this.getAlreadyExistsError();
      }

      response.setResult(await validCart.save());
      return response;

    } catch (error) {
      return this.getUnknownError(error);
    };
  },

  async clean(id) {
    const response = new Response();

    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    const cart = (await this.getById(id)).result;

    if (!cart) {
      return this.getCartNotFoundError()
    }

    cart.products = [];
    cart.coupon = null;

    try {
      const cleanCart = await cart.save();
      response.setResult(this.getUpdate(cleanCart));
      return response

    } catch (error) {
      return this.getUnknownError(error);
    }

  },

  async getById(id) {
    const response = new Response();
    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    try {
      const result = await CartModel.findById(id)
      if (!result) {
        return this.getCartNotFoundError();
      }

      response.setResult(result);
      return response

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async getByUserId(userId) {
    const response = new Response();

    try {
      const result = await CartModel.findOne({ userId })

      if (!result) {
        return this.getCartNotFoundError();
      }

      response.setResult(result);
      return response

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async addProduct(cartProduct) {
    const response = new Response();
    const { cartId: id, product } = cartProduct;

    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    const cart = (await this.getById(id)).result;

    if (!cart) {
      return this.getCartNotFoundError()
    }

    const index = cart.products
      .map(p => p.productId)
      .indexOf(product.productId);

    if (index < 0) {
      cart.products.push(product);
    } else {
      cart.products[index].quantity = product.quantity;
      cart.products[index].price = product.price;
    }

    try {
      const updatedCart = await cart.save();
      response.setResult(this.getUpdate(updatedCart))
      return response;

    } catch (error) {
      return getUnknownError(error)
    }
  },

  async addCoupon(cartCoupon) {
    const response = new Response();
    const options = {
      new: true,
      lean: true,
    }
    const { cartId: id, coupon } = cartCoupon;

    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    try {
      const result = await CartModel.findByIdAndUpdate(
        { _id: id },
        { coupon },
        options,
      );

      if(!result){
        return this.getCartNotFoundError();
      }

      response.setResult(this.getUpdate(result));
      return response;

    } catch (error) {
      return this.getUnknownError(error)
    }
  },

  async qtyUpdate(cartProduct) {
    const response = new Response();
    const { cartId: id, productId, quantity } = cartProduct;

    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    const cart = (await this.getById(id)).result;

    if (!cart) {
      return this.getCartNotFoundError()
    }


    const index = cart.products.map(p => p.productId).indexOf(productId);

    if (index < 0) {
      response.setError({
        code: grpc.status.NOT_FOUND,
        message: 'The product was not found in the cart.'
      });
      return response
    }

    cart.products[index].quantity = quantity;

    try {
      const updatedCart = await cart.save()
      response.setResult(this.getUpdate(updatedCart));
      return response;

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async calculate(cart) {
    const response = new Response();

    if (!isValidId(cart.id)) {
      return this.getInvalidIdError();
    }

    return await this.getById(cart.id)
      .then(data => {
        try {
          if (!data) {
            return this.getCartNotFoundError();
          }

          response.setResult(new CartCalculator(data.result));
          return response;

        } catch (error) {
          return this.getUnknownError();
        }
      })
      .catch(error => {
        return this.getUnknownError(error);
      })
  },

  async removeProduct(ProductCancelation) {
    const response = new Response();
    const { cartId: id, productId } = ProductCancelation;

    if (!isValidId(id)) {
      return this.getInvalidIdError();
    }

    const cart = (await this.getById(id)).result

    if (!cart) {
      return this.getCartNotFoundError()
    }

    const index = cart.products.map(p => p.productId).indexOf(productId);

    if (index < 0) {
      return this.getProductNotFoundError();
    }

    cart.products.splice(index, 1);

    try {
      const result = await cart.save();
      response.setResult(this.getUpdate(result));
      return response;

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async updateCartsPrices({ productId, price }) {
    const response = new Response();

    try {
      const query = {
        'products.productId': productId
      }
      const update = {
        $set: {
          'products.$.price': price
        }
      }

      const result = await CartModel.updateMany(query, update).exec();

      if (result.acknowledged) {
        response.setResult({
          isOK: true,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        })
      } else {
        response.setResult({
          isOK: false,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        })
      }

      return response

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  getUpdate(document) {
    const response = { updatedAt: document.updatedAt }

    return response;
  },

  getUnknownError(error) {
    const response = new Response()
    response.setError({
      code: grpc.status.UNKNOWN,
      message: error.message,
      source: 'shopping-cart'
    })

    return response
  },

  getAlreadyExistsError(error) {
    const response = new Response()
    response.setError({
      code: grpc.status.ALREADY_EXISTS,
      message: error.message,
      source: 'shopping-cart'
    })

    return response
  },

  getInvalidIdError() {
    const response = new Response();
    response.setError({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Invalid Id.',
      source: 'shopping-cart'
    })
    return response
  },

  getCartNotFoundError() {
    const response = new Response();
    response.setError({
      code: grpc.status.NOT_FOUND,
      message: 'The cart was not found.',
      source: 'shopping-cart'
    })
    return response
  },

  getProductNotFoundError() {
    const response = new Response();
    response.setError({
      code: grpc.status.NOT_FOUND,
      message: 'The product was not found.',
      source: 'shopping-cart'
    })
    return response
  },
};