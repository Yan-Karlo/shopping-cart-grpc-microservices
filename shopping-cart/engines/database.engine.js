const mongoose = require('mongoose');
const dependencies = require('../dependencies/server.dependencies')[process.env.NODE_ENV];

module.exports = class Database {

  constructor() {
    this.isRunning = false;
  }

  async start() {
    await this.connect().then(() => {
      console.log('Shopping-cart is connected to MongoDB.');
      this.isRunning = true;
    }).catch((err) => {
      console.error('An error occurred.');
      console.error(`Error message: ${err.message}`);
      this.isRunning = false;
    });
  }

  async stop() {
    this.isRunning = false;
  }

  async connect({ dns } = dependencies) {
    if (!dns) {
      throw new Error('String connection is missing.');
    }

    try {
      await mongoose.connect(dns, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error){
      throw new Error(error);
    };
  }
}
