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
      },
      productClient: {
        pack: 'product',
        serviceName: 'ProductService',
        address: 'localhost:3002',
        fileName: 'product',
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
  docker: {
    port: 3000,
    rpcClients: {
      cartClient: {
        pack: 'cart',
        serviceName: 'CartService',
        address: 'host.docker.internal:3001',
        fileName: 'cart',
        protoConfig: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      },
      productClient: {
        pack: 'product',
        serviceName: 'ProductService',
        address: 'host.docker.internal:3002',
        fileName: 'product',
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
