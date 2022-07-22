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
    const { id } = call.request;
    const response = await cartService.getById(id);
    return this.buildCallback(response, callback)
  },

  async getByUserId(call, callback) {
    const { userId } = call.request;
    console.log(userId);
    const response = await cartService.getByUserId(userId);
    return this.buildCallback(response, callback)
  },

  async addItem(call, callback) {
    const response = await cartService.addItem(call.request);
    return this.buildCallback(response, callback)
  },

  async addCoupon(call, callback) {
    const response = await cartService.addCoupon(call.request);
    return this.buildCallback(response, callback)
  },

  async qtyUpdate(call, callback) {
    const response = await cartService.qtyUpdate(call.request);
    return this.buildCallback(response, callback)
},

  async calculate(call, callback) {
    const response = await cartService.calculate(call.request);
    return this.buildCallback(response, callback)
},

  async removeItem(call, callback) {
    const response = await cartService.removeItem(call.request);
    return this.buildCallback(response, callback)
},

  buildCallback(response, callback) {
    if (response.isError)
      return callback(response.result, null);
    else
      return callback(null, response.result);

  }
};