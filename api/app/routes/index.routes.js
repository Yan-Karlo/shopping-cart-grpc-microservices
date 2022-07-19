const CartRoute = require('./v1/cart.routes');

module.exports = class IndexRoute {
  constructor(router) {
    this.router = router;
    this.version = 'v1';
  }

  Initialize() {
    new CartRoute(this);

    return this.router;
  }

}