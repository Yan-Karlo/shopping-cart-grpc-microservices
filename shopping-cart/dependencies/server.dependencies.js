module.exports = {
  development: {
    protoPath: require('path').join(__dirname, '../proto/cart.proto'),
    url: 'localhost:3001',
    dns: 'mongodb://localhost:27017/cart_db',
    protoOptions: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
    implementation: require('../implementations/cart.implementation'),
  },
  docker: {
    protoPath: require('path').join(__dirname, '../proto/cart.proto'),
    url: '0.0.0.0:3001',
    dns: 'mongodb://db/cart_db',
    protoOptions: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
    implementation: require('../implementations/cart.implementation'),
  },
}