const { Cart, User, Product, History  } = require("../../models")

class HistoryController {
  static async addHistories(payload) {
    try {
      const history = await History.create(payload)
      console.log("🚀 ~ file: history.js ~ line 7 ~ HistoryController ~ addHistories ~ history", history)
      return history
    } catch (err) {
      return false
    }
  }
  static async getHistories(req, res, next) {
    console.log('semua histories');
  }
}

module.exports = HistoryController