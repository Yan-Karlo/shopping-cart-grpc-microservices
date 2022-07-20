const productController = require('../../controllers/product.controllers');

module.exports = class productRoutes {
  constructor(builder) {
    const { router, version } = builder;
    this.path = `/${version}/products`;
    this.controller = new productController();
    this.router = router;

    /* GET */
    this.router.get(`${this.path}/ping`, this.controller.ping);
    this.router.get(`${this.path}/:id`, this.controller.getById);
    this.router.get(`${this.path}/`, this.controller.getAll);

    /* PUT */
    this.router.put(`${this.path}/update-price/:id/:price`, this.controller.updatePrice);
  }
}