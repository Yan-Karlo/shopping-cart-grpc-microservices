const CartService = require('../services/cart.services');

module.exports = class CartController{
    constructor(){
        this.service = new CartService();
    }

  ping = async (req, res) => {
    const response = await this.service.ping()
    return res.status(200).json(response)
  }

  localPing = async (req, res) => {
    return res.status(200).json("server is running")
  }

  clean = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.clean(cartId)
    return res.status(response.httpStatus || 200).json(response);
  }

  create = async (req, res) => {
    const  cart  = {...req.body};
    const response = await this.service.create(cart)
    return res.status(response.httpStatus || 201).json(response);
  }

  getById = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.getById(cartId)
    return res.status(response.httpStatus || 200).json(response);
  }

  getByUserId = async (req, res) => {
    const { userId } = req.params;
    const response = await this.service.getByUserId({userId})
    return res.status(response.httpStatus || 200).json(response);
  }

  addProduct = async (req, res) => {
    const { cartId } = req.params;
    const product = { ...req.body };
    const response = await this.service.addItem(cartId, product)
    return res.status(response.httpStatus || 200).json(response);
  }

  addCoupon = async (req, res) => {
    const { cartId } = req.params;
    const coupon = { ...req.body };
    const response = await this.service.addCoupon(cartId, coupon)
    return res.status(response.httpStatus || 200).json(response);
  }

  qtyUpdate = async (req, res) => {
    const { cartId } = req.params;
    const  itemUpdate  = {...req.body, cartId};
    const response = await this.service.qtyUpdate(itemUpdate)
    return res.status(response.httpStatus || 200).json(response);
  }

  calculate = async (req, res) => {
    const { cartId } = req.params;
    const response = await this.service.calculate(cartId)
    return res.status(response.httpStatus || 200).json(response);
  }

  removeProduct = async (req, res) => {
    const response = await this.service.removeItem(req.params)
    return res.status(response.httpStatus || 200).json(response);
  }

  qtyUpdate = async (req, res) => {
    const {cartId} = req.params;
    const response = await this.service.qtyUpdate({ ...req.body, cartId })
    return res.status(response.httpStatus || 200).json(response);
  }
}