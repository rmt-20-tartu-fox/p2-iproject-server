const { Op } = require('sequelize')
const {Operator, Map, User, Strat} = require('../models')
class Controller{
  static async getAllOperator(req, res, next){
    // console.log(req.body)
    let {role} = req.query
    // console.log(req.params, "<<,")
    if(!role){
      role = ''
    }
    try {
      let allOperators = await Operator.findAll({
        where: {
          role: {
            [Op.iLike]: `%${role}%`
          }
        }
      })

      res.status(200).json(allOperators)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async getOneOperator(req, res, next){
    let {operatorId} = req.params

    try {
      let targetedOperator = await Operator.findByPk(+operatorId)
      if (!targetedOperator){
        res.status(404).json({message: 'Operator Not Found'})
        return
      }

      res.status(200).json(targetedOperator)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = Controller