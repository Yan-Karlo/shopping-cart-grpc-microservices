module.exports = {
  development: {
    port: 3000,

    rpcClients: {
      cartClient: {
        pack: 'cart',
        serviceName: 'CartService',
        address: 'localhost:3001',
        fileName: 'cart',
        protoConfig: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      }
    }
  },

};
