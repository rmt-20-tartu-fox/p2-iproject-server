const {Operator, Map, User, Strat} = require('../models')
class Controller{
  static async getAllMap(req, res, next){
    try {
      let allMaps = await Map.findAll()

      res.status(200).json(allMaps)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

module.exports = Controller