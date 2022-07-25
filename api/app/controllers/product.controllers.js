const productService = require('../services/product.services');

module.exports = class productController{
    constructor(){
        this.service = new productService();
    }

  ping = async (req, res) => {
    const response = await this.service.ping()
    res.status(200).json(response)
  }

  getById = async (req, res) => {
    const response = await this.service.getById({...req.params})
    return res.status(response.httpStatus || 200).json(response);
  }

  getAll = async (req, res) => {
    const response = await this.service.getAll()
    return res.status(response.httpStatus || 200).json(response);
  }

  updatePrice = async (req, res) => {
    const response = await this.service.updatePrice({...req.params})
    return res.status(response.httpStatus || 200).json(response);
  }
}