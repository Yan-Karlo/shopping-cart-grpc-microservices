const CartController = require('../../controllers/cart.controllers');

module.exports = class CartRoutes {
  constructor(builder) {
    const { router, version } = builder;
    this.path = `/${version}/carts`;
    this.controller = new CartController();
    this.router = router;

    /* GET */
    this.router.get(`${this.path}/ping`, this.controller.ping);
    this.router.get(`${this.path}/get-by-cart/:cartId`, this.controller.getById);
    this.router.get(`${this.path}/get-by-user/:userId`, this.controller.getByUserId);
    this.router.get(`${this.path}/calculate/:cartId`, this.controller.calculate);

    /* POST */
    this.router.post(`${this.path}`, this.controller.create);

    /* PUT */
    this.router.put(`${this.path}/clean/:cartId`, this.controller.clean);
    this.router.put(`${this.path}/add-item/:cartId`, this.controller.addItem);
    this.router.put(`${this.path}/add-coupon/:cartId`, this.controller.addCoupon);
    this.router.put(`${this.path}/remove-item/:cartId/:productId`, this.controller.removeItem);
  }
}