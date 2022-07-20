const CartRoute = require('./v1/cart.routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

module.exports = class IndexRoute {
  constructor(router) {
    this.router = router;
    this.version = 'v1';
  }

  Initialize() {
    this.router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    new CartRoute(this);

    return this.router;
  }

}