const products = require('./products');
const ProductModel = require('../models/product.model');
const log = console.log
module.exports = async () => {
  // await ProductModel.deleteMany({})
  console.log('Stating the data seeding process ...')

  const docQtty = await ProductModel.countDocuments({});

  if(docQtty == 0) {
    const productsBulk = products.map(prod => {
      return {
        insertOne: {
          document: {
            ...prod
          }
        }
      }
    })
    await ProductModel.bulkWrite(productsBulk).then(res => {
      console.log('Products Registered: ', res.insertedCount);
    });
  }
  console.log('The data seeding process is done.')
}