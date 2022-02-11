const {Operator, Map, User, Strat} = require('../models')
class Controller{
  static async getAllOperator(req, res, next){
    try {
      let allOperators = await Operator.findAll()

      res.status(200).json(allOperators)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

module.exports = Controller