const cartService = require('./services/cart.services');

module.exports = {
  async create(call, callback) {
    const response = await cartService.create(call.request);
    return this.buildCallback(response, callback);
  },

  async clean(call, callback) {
    const { id } = call.request;
    const response = await cartService.clean(id);
    return this.buildCallback(response, callback);
  },

  async getById(call, callback) {
  },

  async addItem(call, callback) {
  },

  async addCoupon(call, callback) {
  },

  async qtyUpdate(call, callback) {
  },

  async calculate(call, callback) {
  },

  async removeItem(call, callback) {
  },

  buildCallback(response, callback) {
    if (response.isError)
      return callback(response.result, null);
    else
      return callback(null, response.result);

  }
};