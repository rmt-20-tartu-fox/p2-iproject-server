const {
  Product
} = require('../../models')

class ProductCustomerController {
  static async allProduct(req, res, next) {
    try {
      let name;
      if (req.data) {
        name = req.data.name
      }
      const options = {
        where: {}
      } 

      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        }
      }

      const products = await Product.findAll(options)
      res.status(200).json(products)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ProductCustomerController