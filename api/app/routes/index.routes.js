const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');
const CartRoute = require('./v1/cart.routes');
const ProductRoute = require('./v1/product.routes');

module.exports = class IndexRoute {
  constructor(router) {
    this.router = router;
    this.version = 'v1';
  }

  Initialize() {
    this.router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    new CartRoute(this);
    new ProductRoute(this);

    return this.router;
  }

}