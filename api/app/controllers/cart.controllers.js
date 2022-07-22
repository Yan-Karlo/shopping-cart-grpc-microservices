const CartService = require('../services/cart.services');

module.exports = class CartController{
    constructor(){
        this.service = new CartService();
    }

  ping = (req, res) => {
    const response = this.service.ping()
    res.status(200).json(response)
  }

  clean = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.clean(cartId)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  create = async (req, res) => {
    const  cart  = {...req.body};
    const response = await this.service.create(cart)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  getById = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.getById(cartId)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  getByUserId = async (req, res) => {
    const { userId } = req.params;
    const response = await this.service.getByUserId({userId})
    return res.status(response.httpStatus || 200).json(response.result);
  }

  addProduct = async (req, res) => {
    const { cartId } = req.params;
    const product = { ...req.body };
    const response = await this.service.addItem(cartId, product)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  addCoupon = async (req, res) => {
    const { cartId } = req.params;
    const coupon = { ...req.body };
    const response = await this.service.addCoupon(cartId, coupon)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  qtyUpdate = async (req, res) => {
    const { cartId } = req.params;
    const  itemUpdate  = {...req.body, cartId};
    const response = await this.service.qtyUpdate(itemUpdate)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  calculate = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.calculate(cartId)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  removeProduct = async (req, res) => {
    const response = await this.service.removeItem(req.params)
    return res.status(response.httpStatus || 200).json(response.result);
  }

  qtyUpdate = async (req, res) => {
    const {cartId} = req.params;
    const response = await this.service.qtyUpdate({ ...req.body, cartId })
    return res.status(response.httpStatus || 200).json(response.result);
  }
}