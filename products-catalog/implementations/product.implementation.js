const productService = require('./services/product.services');

module.exports = {
  async getAll(call, callback) {
    const response = await productService.getAll();
    return this.buildCallback(response, callback)
  },

  async getById(call, callback) {
    const { id } = call.request;
    const response = await productService.getById(id);
    return this.buildCallback(response, callback)
  },

  async getMany(call, callback) {
    const { products } = call.request;
    const response = await productService.getMany(products);
    return this.buildCallback(response, callback)
  },

  async updatePrice(call, callback) {
    const response = await productService.updatePrice(call.request);
    return this.buildCallback(response, callback)
  },

  buildCallback(response, callback) {
    if (response.isError)
      return callback(response.result, null);
    else
      return callback(null, response.result);
  }
};