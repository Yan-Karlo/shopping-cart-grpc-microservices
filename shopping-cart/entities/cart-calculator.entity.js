const Cart = require('./cart.entity');

module.exports = class CartCalculator {
  constructor(cart) {
    this.cart = new Cart(cart);
    this.calculateProducts();
    this.subTotal = this.calculateSubtotal(this.cart.products);
    this.discount = this.calculateDiscount(this.subTotal);
    this.total = this.subTotal - this.discount;
    this.generatedAt = new Date().toUTCString();
  }

  calculateProducts(products ) {
    this.cart.products.forEach(product => {
      product.subTotal = product.quantity * product.price;
      // product.subTotal = product.quantity * product.price;
    });
  }

  calculateSubtotal(list) {
    var subTotal = 0;
    list.forEach(item => subTotal += item.subTotal)
    return subTotal;
  }

  calculateDiscount(value) {
    if (this.cart.coupon != null) {
      return value * this.cart.coupon.percentage / 100;
    }
    return 0;
  }
}
