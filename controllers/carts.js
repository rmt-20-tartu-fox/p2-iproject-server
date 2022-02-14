const { User, Cart, Product} = require('../models')

class CartController {
  static async allCartByUserId(req, res, next) {
    try {
      const { UserId } = req.userLogin
      const userAndCart = await User.findAll({
        where: {
          id: UserId
        },
        include: Product
      })
      res.status(200).json(userAndCart)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async addCart(req, res, next) {
    try {
      const { UserId } = req.userLogin
      const { productId } = req.params
  
      const newCart = await Cart.create({
        ProductId: +productId,
        UserId,
        isCheckout: false
      })
  
      res.status(201).json(newCart)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController