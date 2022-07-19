const CartController = require('../../controllers/cart.controllers');

module.exports = class CartRoutes {
  constructor(builder) {
    const { router, version } = builder;
    this.path = `/${version}/carts`;
    this.controller = new CartController();
    this.router = router;

    this.router.get(`${this.path}/ping`, this.controller.ping);
    this.router.get(`${this.path}/get-by-id/:id`, this.controller.getById);
  }
}