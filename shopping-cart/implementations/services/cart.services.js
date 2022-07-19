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
        code:grpc.status.INTERNAL,
        message: 'Something went wrong when creating a new shopping cart'
      });
    }

    return response;
  },

  async clean(id) {
  },

  async getById(id) {
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

  getUpdate(document){
    const response = { updatedAt: document.updatedAt }

    return response;
  },
};