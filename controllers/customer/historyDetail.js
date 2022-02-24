const { HistoryDetail  } = require("../../models")

class HistoryDetailController {
  static async addDetail(selected, HistoryId) {
    try {
      const payload = []
      selected.forEach(el => {
        payload.push({
          ProductId: el.ProductId,
          HistoryId
        })
      });
      console.log(payload);
      await HistoryDetail.bulkCreate(payload)
      return true
    } catch (err) {
      console.log("🚀 ~ file: historyDetail.js ~ line 17 ~ HistoryDetailController ~ addDetail ~ err", err)
      return false
    }
  }
  static async getDetail(req, res, next) {
    console.log('semua histories');
  }
}

module.exports = HistoryDetailController