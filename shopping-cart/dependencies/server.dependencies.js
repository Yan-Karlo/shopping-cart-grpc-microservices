module.exports = {
  protoPath: require('path').join(__dirname, '../../proto/cart.proto'),
  dns: 'mongodb://localhost:27017/cart_db',
  protoOptions :       {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
  implementation : require('../implementations/cart.implementation'),
}