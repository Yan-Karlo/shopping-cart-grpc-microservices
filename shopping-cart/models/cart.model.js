const { Schema, default: mongoose } = require('mongoose');


const ProductSubSchema = new Schema(
  {
    productId: { type: String },
    quantity: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
  },
  {
    _id: false,
    // id: false,
    timestamps: true
  }

)

ProductSubSchema.virtual('subTotal').
  get(function () { return this.price * this.quantity; })

const CartSchema = new Schema(
  {
    id: String,
    userId: { type: String, index: true, default: null },
    products: [ProductSubSchema],
    coupon: {
      id: { type: String, default: '' },
      percentage: { type: Number, min: 0, max: 100, default: 0 }
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Cart', CartSchema);