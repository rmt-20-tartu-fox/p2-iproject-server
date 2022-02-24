const {
  User,
  Cart,
  Product
} = require('../../models')
const HistoryController = require('./history')
const HistoryDetailController = require('./historyDetail')
const Axios = require('axios')
const midtransClient = require('midtrans-client');

var paymentToken = ""

class CartController {
  static async allCartByUserId(req, res, next) {
    try {
      const {
        UserId
      } = req.userLogin

      const {
        name
      } = req.query

      const userAndCarts = await User.findOne({
        where: {
          id: UserId
        },
        include: ['productCart']
      })

      const carts = await Cart.findAll({
        include: [ Product ],
        where: {
          UserId
        }
      })

      const cartsIsCheckoutFalse = carts.filter(el => !el.isCheckout)
      res.status(200).json({
        carts: cartsIsCheckoutFalse
      })
    } catch (err) {
      console.log(err);
      next(err)
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
      next(err)
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

      const findProduct = await Product.findByPk(+productId)
      if (!findProduct) {
        throw ({
          code: 404,
          message: "Product not found!",
          name: "NOT FOUND"
        })
      }

      const newCart = await Cart.create({
        ProductId: +productId,
        UserId,
        isCheckout: false,
        isSelect: false,
        quantity: 1
      })

      res.status(201).json(newCart)
    } catch (err) {
      console.log("🚀 ~ file: carts.js ~ line 94 ~ CartController ~ addCart ~ err", err)
      next(err)
      console.log("🚀 ~ file: carts.js ~ line 96 ~ CartController ~ addCart ~ err", err)
    }
  }
  static async checkoutPopUp(req, res, next) {
    try {
      const {
        UserId,
        name,
        email
      } = req.userLogin

      const {
        destination
      } = req.headers

      const cartsSelected = await Cart.findAll({
        where: {
          UserId,
          isSelect: true
        },
        include: [ Product ]
      })

      if (!cartsSelected.length) {
        throw ({
          name: 'checkout failed',
          code: 404,
          message: 'No Coffee or Food you want checkout'
        })
      }

      let totalPrice = 0
      cartsSelected.forEach(el => {
        let price = el.quantity * el.Product.price
        totalPrice += price
      });

      let totalWeight = 0
      cartsSelected.forEach(el => {
        let weight = el.Product.weight
        totalWeight += weight
      });

      const payload = {
        name,
        total: totalPrice,
        weight: totalWeight,
        destination: +destination
      }

      req.forOngkir = payload
      console.log("🚀 ~ file: carts.js ~ line 180 ~ CartController ~ checkoutPopUp ~ req.forOngkir", req.forOngkir)
      
      CartController.ongkir(req, res, next)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async checkout(req, res, next) {
    try {
      console.log(req.forOngkir, 'ini');
      const createHistory = await HistoryController.addHistories(req.forOngkir)
      if (createHistory !== false) {
        await HistoryDetailController.addDetail(cartsSelected, createHistory.id)
      }

      const payloadPayment = {
        order_id: createHistory.id,
        gross_amount: payload.total,
        email,
        name
      }

      req.forPayment = payloadPayment

      CartController.payment(req, res, next)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async allCity(req, res, next) {
    try {
      const {
        province
      } = req.headers

      const cities = await Axios({
        method: "get",
        url: `https://api.rajaongkir.com/starter/city?province=${province}`,
        headers: {
          key: "1fd4016288844aeacd3f03930fd95625",
        }
      })
      res.status(200).json(cities.data)
    } catch (err) {
      next(err)
    }
  }
  static async allProvince(req, res, next) {
    try {
      const provinces = await Axios({
        method: "GET",
        url: "https://api.rajaongkir.com/starter/province",
        headers: {
          key: "1fd4016288844aeacd3f03930fd95625",
        }
      })
      res.status(200).json(provinces.data)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async ongkir(req, res, next) {
    try {
      const {
        name,
        total,
        destination,
        weight,
      } = req.forOngkir

      const dataOngkir = await Axios({
        method: "post",
        url: "https://api.rajaongkir.com/starter/cost",
        headers: {
          key: "1fd4016288844aeacd3f03930fd95625",
        },
        data: {origin: 455, destination, weight, courier: 'jne'}
      })
      res.status(200).json({
        dataOngkir: dataOngkir.data.rajaongkir.results,
        payload: req.forOngkir
      })
    } catch (err) {
      console.log(err);
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
      console.log("🚀 ~ file: carts.js ~ line 234 ~ CartController ~ changeIsSelect ~ id", req.params)
      const cart = await Cart.findOne({
        where: {
          id: +id
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
              id: +id
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
              id: +id
            }
          })
          res.status(200).json({
            message: 'Cart is unselect'
          })
          break;
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async selectCart(req, res, next) {
    CartController.changeIsSelect(req, res, next, "select")
  }
  static async unselectCart(req, res, next) {
    CartController.changeIsSelect(req, res, next, "unselect")
  }
  static async quantityInc(req, res, next) {
    try {
      const {
        id
      } = req.params
      const {
        UserId
      } = req.userLogin

      const cart = await Cart.findOne({
        where: {
          id: +id
        },
        include: [ Product ]
      })

      if (!cart) {
        throw ({
          name: 'NOT FOUND',
          message: 'Cart not found!',
          code: 404
        })
      }

      if (cart.Product.stock === cart.quantity || cart.Product.stock === cart .quantity + 1) {
        throw ({
          code: 400,
          message: "Stock not availabe with quantity",
          name: "Bad Request"
        })
      }

      Cart.increment('quantity', { where: { id: +id }});
      res.status(200).json({
        message: 'Quantity Increment'
      })
    } catch (err) {
      next(err)
    }
  }
  static async quantityDec(req, res, next) {
    try {
      const {
        id
      } = req.params
      const {
        UserId
      } = req.userLogin

      const cart = await Cart.findOne({
        where: {
          id: +id
        }
      })

      if (!cart) {
        throw ({
          name: 'NOT FOUND',
          message: 'Cart not found!',
          code: 404
        })
      }

      if (cart.quantity !== 1) {
        Cart.decrement('quantity', { where: { id: +id }});
      }

      res.status(200).json({
        message: 'Quantity Decrement'
      })
    } catch (err) {
      next(err)
    }
  }
  static payment(req, res, next) {
    const {
      order_id,
      gross_amount,
      email,
      name
    } = req.forPayment

    const first_name = name.split(' ')[0]
    let last_name = name.split(' ')[1]

    if (!last_name) {
      last_name = ""
    }

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction : false,
      serverKey : 'SB-Mid-server-MY7UjyT3Kw_qlsfdvb8a-Ehc'
    });

    let parameter = {
      "transaction_details": {
          "order_id": order_id,
          "gross_amount": 10000
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "phone": "08111222333"
      }
    };

    snap.createTransaction(parameter)
      .then((transaction)=>{
          // transaction token
          let transactionToken = transaction.token;
          paymentToken = transactionToken
          console.log("🚀 ~ file: carts.js ~ line 412 ~ CartController ~ .then ~ paymentToken", paymentToken)
          res.status(200).json({
            message: 'Checkout successfully!',
            paymentToken
          })
      })
      .catch(err => false)
    }
}

module.exports = CartController