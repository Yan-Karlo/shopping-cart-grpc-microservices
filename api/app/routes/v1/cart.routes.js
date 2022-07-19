const CartController = require('../../controllers/cart.controllers');

module.exports = class CartRoutes {
  constructor(builder) {
    const { router, version } = builder;
    this.path = `/${version}/carts`;
    this.controller = new CartController();
    this.router = router;

    this.router.get(`${this.path}/ping`, this.controller.ping);
    this.router.get(`${this.path}/:id`, this.controller.getById);
    this.router.put(`${this.path}/clean/:id`, this.controller.clean);
    this.router.post(`${this.path}`, this.controller.create);
  }
}