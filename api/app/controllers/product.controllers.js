const productService = require('../services/product.services');

module.exports = class productController{
    constructor(){
        this.service = new productService();
    }

  ping = (req, res) => {
    const response = this.service.ping()
    res.status(200).json(response)
  }

  getById = async (req, res) => {
    const response = await this.service.getById({...req.params})
    return res.status(response.httpStatus || 200).json(response.result);
  }

  getAll = async (req, res) => {
    const response = await this.service.getAll()
    return res.status(response.httpStatus || 200).json(response.result);
  }

  updatePrice = async (req, res) => {
    const response = await this.service.updatePrice({...req.params})
    return res.status(response.httpStatus || 200).json(response.result);
  }
}