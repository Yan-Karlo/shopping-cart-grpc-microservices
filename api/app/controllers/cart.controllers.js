const { response } = require('express');
const CartService = require('../services/cart.services');

module.exports = class CartController{
    constructor(){
        this.service = new CartService();
    }

  ping = (req, res) => this.service.ping();
}