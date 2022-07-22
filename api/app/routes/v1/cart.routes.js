const CartController = require('../../controllers/cart.controllers');

module.exports = class CartRoutes {
  constructor(builder) {
    const { router, version } = builder;
    this.path = `/${version}/carts`;
    this.controller = new CartController();
    this.router = router;

    /* GET */
    this.router.get(`${this.path}/ping`, this.controller.ping);
    this.router.get(`${this.path}/:cartId`, this.controller.getById);
    this.router.get(`${this.path}/get-by-user/:userId`, this.controller.getByUserId);
    this.router.get(`${this.path}/calculate/:cartId`, this.controller.calculate);

    /* POST */
    this.router.post(`${this.path}`, this.controller.create);

    /* PUT */
    this.router.put(`${this.path}/clean/:cartId`, this.controller.clean);
    this.router.put(`${this.path}/add-product/:cartId`, this.controller.addProduct);
    this.router.put(`${this.path}/add-coupon/:cartId`, this.controller.addCoupon);
    this.router.put(`${this.path}/qty-update/:cartId`, this.controller.qtyUpdate);
    this.router.put(`${this.path}/remove-product/:cartId/:productId`, this.controller.removeProduct);
  }
}