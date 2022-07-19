const CartService = require('../services/cart.services');

module.exports = class CartController{
    constructor(){
        this.service = new CartService();
    }

  ping = (req, res) => {
    const response = this.service.ping()
    res.status(200).json(response)
  }

  getById = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.getById(id)
    return res.status(response.httpStatus || 200).json(response.result);
  }
}