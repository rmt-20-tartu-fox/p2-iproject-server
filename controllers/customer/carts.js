const {
  User,
  Cart,
  Product
} = require('../../models')

class CartController {
  static async allCartByUserId(req, res, next) {
    try {
      const {
        UserId
      } = req.userLogin

      const userAndCarts = await User.findOne({
        where: {
          id: UserId
        },
        include: {
          model: Product,
        }
      })
      const carts = userAndCarts.Products.filter(el => !el.Cart.isCheckout)
      res.status(200).json(carts)
    } catch (err) {
      console.log("🚀 ~ file: carts.js ~ line 25 ~ CartController ~ allCartByUserId ~ err", err)
      console.log(err);
      console.log("🚀 ~ file: carts.js ~ line 26 ~ CartController ~ allCartByUserId ~ err", err)
      next(err)
      console.log("🚀 ~ file: carts.js ~ line 28 ~ CartController ~ allCartByUserId ~ err", err)
    }
  }
  static async removeAllCarts(req, res, next) {
    try {
      const {
        UserId
      } = req.userLogin

      await Cart.destroy({
        where: {
          UserId
        }
      })

      res.status(200).json({
        message: 'Carts has been deleted'
      })
    } catch (err) {
      console.log("🚀 ~ file: carts.js ~ line 47 ~ CartController ~ removeAllCarts ~ err", err)
      next(err)
      console.log("🚀 ~ file: carts.js ~ line 49 ~ CartController ~ removeAllCarts ~ err", err)
    }
  }
  static async removeCartById(req, res, next) {
    try {
      const {
        id
      } = req.params
      const cart = await Cart.findOne({
        where: {
          id
        }
      })
      if (!cart) {
        throw ({
          name: 'NOT FOUND',
          message: 'Cart Not Found!',
          code: 404
        })
      }

      await Cart.destroy({
        where: {
          id
        }
      })

      res.status(200).json({
        message: "Delete successfully!"
      })
    } catch (err) {
      next(err)
    }
  }
  static async addCart(req, res, next) {
    try {
      const {
        UserId
      } = req.userLogin
      const {
        productId
      } = req.params

      const newCart = await Cart.create({
        ProductId: +productId,
        UserId,
        isCheckout: false,
        isSelect: false
      })

      res.status(201).json(newCart)
    } catch (err) {
      console.log("🚀 ~ file: carts.js ~ line 94 ~ CartController ~ addCart ~ err", err)
      next(err)
      console.log("🚀 ~ file: carts.js ~ line 96 ~ CartController ~ addCart ~ err", err)
    }
  }
  static async checkout(req, res, next) {
    try {
      const {
        UserId
      } = req.userLogin
      const updateCartStatus = await Cart.update({
        isCheckout: true
      }, {
        where: {
          UserId,
          isSelect: true
        }
      })
      if (updateCartStatus[0] === 0) {
        throw ({
          name: 'checkout failed',
          code: 417,
          message: 'No Coffee or Food you want checkout'
        })
      }
      res.status(200).json({
        message: 'Checkout successfully!'
      })
    } catch (err) {
      next(err)
    }
  }
  static async changeIsSelect(req, res, next, intruction) {
    try {
      const {
        id
      } = req.params
      const {
        UserId
      } = req.userLogin

      const cart = await Cart.findOne({
        where: {
          id
        }
      })

      if (!cart) {
        throw ({
          name: 'NOT FOUND',
          message: 'Cart not found!',
          code: 404
        })
      }

      switch (intruction) {
        case "select":
          await Cart.update({
            isSelect: true
          }, {
            where: {
              UserId
            }
          })
          res.status(200).json({
            message: 'Cart is selected'
          })
          break;
        default:
          await Cart.update({
            isSelect: false
          }, {
            where: {
              UserId
            }
          })
          res.status(200).json({
            message: 'Cart is unselect'
          })
          break;
      }
    } catch (err) {
      next(err)
    }
  }
  static async selectCart(req, res, next) {
    CartController.changeIsSelect(req, res, next, "select")
  }
  static async unselectCart(req, res, next) {
    CartController.changeIsSelect(req, res, next, "unselect")
  }
}

module.exports = CartController