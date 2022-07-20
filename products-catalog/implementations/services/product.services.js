const mongoose = require('mongoose');
const grpc = require('grpc');
const ProductModel = require('../../models/product.model');
const Response = require('../../entities/response.entity');
const isValidId = mongoose.Types.ObjectId.isValid;

module.exports = {
  async getById(id) {
    const response = new Response();

    if (!isValidId(id))
      return this.getInvalidIdError();

    try {
      const result = await ProductModel.findById(id)
      response.setResult(result);
      return response

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async getAll() {
    const response = new Response();

    try {
      const result = await ProductModel.find({})
      response.setResult({products : [...result]});
      return response

    } catch (error) {
      return this.getUnknownError(error);
    }
  },

  async updatePrice({ productId: id, price } = newPrice) {
    if (!isValidId(id))
      return this.getInvalidIdError();

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      {
        _id: mongoose.mongo.ObjectId(id)
      },
      { price })
    return this.getUpdate(updatedProduct);
  },

  async getUpdate(document) {
    const response = new Response();
    response.setResult({ updatedAt: document.updatedAt });

    return response;
  },

  getUnknownError(error) {
    const response = new Response()
    response.setError({
      code: grpc.status.UNKNOWN,
      message: error.message
    })

    return response
  },

  getInvalidIdError() {
    const response = new Response();
    response.setError({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Invalid Id.',
      source: 'product'
    })
    return response
  },

  getProductNotFoundError() {
    const response = new Response();
    response.setError({
      code: grpc.status.NOT_FOUND,
      message: 'The Product was not found.',
      source: 'product'
    })
    return response
  },
};