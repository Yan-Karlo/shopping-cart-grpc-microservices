const { Schema, default: mongoose } = require('mongoose');


const ProductSchema = new Schema(
  {
    description : { type: String, trim : true},
    quantity: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
    isSuspended : { type: Boolean, default: false}
  },
  {
    timestamps: true
  }

)

module.exports = mongoose.model('Product', ProductSchema);