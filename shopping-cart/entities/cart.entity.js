module.exports = class Cart {
  constructor(cart){
    this._id = cart._id ? cart._id : null;
    this.userId = cart.userId ? cart.userId : null;
    this.products = !cart.products ? [] : this.extractProducts(cart.products);
    this.coupon = cart.coupon ? cart.coupon : null;
    this.createdAt = cart.createdAt ? cart.createdAt : null;
    this.updatedAt = cart.updatedAt ? cart.updatedAt : null;
  }

  extractProducts(products) {
    const response = products.map(prod => {
      return {
        productId: prod.productId,
        quantity: prod.quantity,
        price: prod.price,
        subTotal: prod.subTotal,
        createdAt: prod.createdAt,
        updatedAt: prod.updatedAt,
      }
    });

    return response;
  }

}
