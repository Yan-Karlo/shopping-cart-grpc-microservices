module.exports = {
  development: {
    url: '127.0.0.1:3002',
    dns: 'mongodb://localhost:27017/product_db',
    protoPath: require('path').join(__dirname, '../../proto/product.proto'),
    protoOptions :       {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
    implementation: require('../implementations/product.implementation'),
  }
}