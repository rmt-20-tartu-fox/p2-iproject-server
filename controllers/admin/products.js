const {
  Product
} = require('../../models')

class ProductController {
  static async allProduct(req, res, next) {
    try {
      const products = await Product.findAll()
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
  static async addProduct(req, res, next) {
    try {
      const {
        name,
        price,
        description,
        stock,
        imageUrl
      } = req.body
      const {
        UserId
      } = req.userLogin
      const result = await Product.create({
        name,
        price: +price,
        description,
        stock: +stock,
        imageUrl,
        AuthorId: UserId,
        status: 'public'
      })
      res.status(201).json(result)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async productById(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const product = await Product.findByPk(+productId)
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async removeProduct(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const productName = await Product.findByPk(+productId)
      const result = await Product.destroy({
        where: {
          id: +productId
        }
      })
      res.status(200).json({
        message: `${productName.name} success to delete`
      })
    } catch (err) {
      next(err)
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const {
        name,
        price,
        description,
        stock,
        imageUrl
      } = req.body

      const productName = await Product.findByPk(+productId)
      const result = await Product.update({
        name,
        price,
        description,
        stock,
        imageUrl
      }, {
        where: {
          id: +productId
        }
      })

      res.status(200).json({
        message: `${productName.name} success to update`
      })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async incrementStock(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const findProduct = await Product.findByPk(+productId)
      if (!findProduct) {
        throw ({
          code: 404,
          name: 'NOT FOUND',
          message: 'Product not found'
        })
      }
      await Product.increment('stock', {
        where: {
          id: +productId
        }
      })
      res.status(200).json({
        message: 'Increment stock'
      })
    } catch (err) {
      next(err)
    }
  }
  static async decrementStock(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const findProduct = await Product.findByPk(+productId)
      if (!findProduct) {
        throw ({
          code: 404,
          name: 'NOT FOUND',
          message: 'Product not found'
        })
      }
      await Product.decrement('stock', {
        where: {
          id: +productId
        }
      })
      res.status(200).json({
        message: 'Decrement stock'
      })
    } catch (err) {
      next(err)
    }
  }
  static async productStatus(req, res, next) {
    try {
      const {
        productId
      } = req.params
      const {
        newStatus
      } = req.body
      const findProduct = await Product.findByPk(+productId)
      if (!findProduct) {
        throw ({
          code: 404,
          name: 'NOT FOUND',
          message: 'Product not found'
        })
      }
      const result = await Product.update({
        status: newStatus
      }, {
        where: {
          id: +productId
        }
      })
      res.status(200).json({
        message: `Changed status from ${findProduct.status} to ${newStatus}`
      })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ProductController