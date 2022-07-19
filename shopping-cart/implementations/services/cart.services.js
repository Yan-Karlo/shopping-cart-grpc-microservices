const mongoose = require('mongoose');
const grpc = require('grpc');
const Response = require('../../entities/response.entity');
const CartModel = require('../../models/cart.model');

const isValidId = mongoose.Types.ObjectId.isValid

module.exports = {
  async create(cart) {
    const response = new Response();

    const validCart = await new CartModel(cart)

    try {
      const newCart = await validCart.save();

      response.setResult({
        _id: newCart._id,
        createdAt: newCart.createdAt,
      });

    } catch (error) {
      response.setError({
        code: grpc.status.INTERNAL,
        message: 'Something went wrong when creating a new shopping cart'
      });
    }

    return response;
  },

  async clean(id) {
    const response = new Response();

    if (!isValidId(id)) {
      response.setError({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Invalid Id.'
      })

      return response;
    }

    const cart = (await this.getById(id)).result;

    if (!cart) {
      response.setError({
        code: grpc.status.NOT_FOUND,
        message: 'Cart not found'
      });

      return response
    }

    cart.products = [];
    cart.coupon = null;

    try {
      const cleanCart = await cart.save();
      response.setResult(this.getUpdate(cleanCart));

    } catch (error) {
      response.setError({
        code: grpc.status.INTERNAL,
        message: 'Something went wrong when cleaning the cart'
      });
    }

    return response
  },

  async getById(id) {
    const response = new Response();

    if (!isValidId(id)) {
      response.setError({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Invalid Id.'
      })

      return response
    }

    try {
      response.setResult(
        await CartModel.findById(id)
      );

      return response

    } catch (error) {
      response.setError({
        code: error.code,
        message: error.message
      });
    }
  },

  async addItem(cartItem) {
  },

  async addCoupon(cartCoupon) {
  },

  async qtyUpdate(cartItem) {
  },

  async calculate(cartId) {
  },

  async removeItem(itemCancelation) {
  },

  async updateCart(cart) {
  },

  getUpdate(document) {
    const response = { updatedAt: document.updatedAt }

    return response;
  },
};