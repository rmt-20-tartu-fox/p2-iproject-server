const { Cart, User, Product  } = require("../../models")

class HistoryController {
  static async addHistories(req, res, next) {
    try {
      const {
        UserId,
        name
      } = req.userLogin

      const userAndCarts = await User.findOne({
        where: {
          id: UserId
        },
        include: ['productCart']
      })

      console.log(userAndCarts);
      if (!userAndCarts) {
        throw ({
          code: 404,
          message: 'Carts is empty',
          name: 'NOT FOUND'
        })
      }

      res.status(200).json(userAndCarts)
      // 1. cek apakah ada cart jika ada ambil , jika tidak cart empty
      // 2. tambahkan entity ke table History, dan masukin semua cart ke dalam History Detail      
    } catch (err) {
      next(err)
    }
  }
  static async getHistories(req, res, next) {
    console.log('semua histories');
  }
}

module.exports = HistoryController