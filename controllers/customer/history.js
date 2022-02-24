const { Cart, User, Product, History  } = require("../../models")

class HistoryController {
  static async addHistories(payload) {
    try {
      const {
        name,
        total
      } = payload
      const history = await History.create(payload)
      return history
    } catch (err) {
      return false
    }
  }
  static async getHistories(req, res, next) {
    try {
      const {
        UserId,
        name
      } = req.userLogin

      const histories = await History.findAll({
        where: {
          name
        }
      })

      res.status(200).json(histories)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = HistoryController