const {
  Product
} = require('../../models')

class ProductCustomerController {
  static async allProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        where: {
          status: 'public'
        }
      })
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductCustomerController