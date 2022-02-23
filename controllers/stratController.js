const {Operator, Map, User, Strat} = require('../models')
class Controller{
  static async getAllStrat(req, res, next){
    try {
      let allStrat = await Strat.findAll({
        include: [
          'Op1',
          'Op2',
          'Op3',
          'Op4',
          'Op5',
          {
            model: Map
          },
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      })

      let allStrats = allStrat.map((el) => {
        el.dataValues['myOperators'] = []
        el.dataValues.myOperators.push(el.dataValues.Op1)
        el.dataValues.myOperators.push(el.dataValues.Op2)
        el.dataValues.myOperators.push(el.dataValues.Op3)
        el.dataValues.myOperators.push(el.dataValues.Op4)
        el.dataValues.myOperators.push(el.dataValues.Op5)

        delete el.dataValues.Op1
        delete el.dataValues.Op2
        delete el.dataValues.Op3
        delete el.dataValues.Op4
        delete el.dataValues.Op5

        return el
      })
      // console.log(allStrats[0])
      res.status(200).json(allStrats)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Internal server error'})
    }
  }

  static async addNewStrat(req, res, next){
    // console.log("OK")
    let {currentRole, MapId, Op1Id, Op2Id, Op3Id, Op4Id, Op5Id, description} = req.body
    console.log(currentRole, MapId, Op1Id, Op2Id, Op3Id, Op4Id, Op5Id, description)
    let {id, email, role, username} = req.loggedUser
    try {

      // if (currentRole !== 'Defend' || currentRole !== 'Attack'){
      //   res.status(400).json({message: "Choose Your Side"})
      //   return
      // }
      if (!MapId){
        res.status(400).json({message: "Choose A Map"})
        return 
      }
      if (Op1Id === Op2Id || Op1Id === Op3Id || Op1Id === Op4Id || Op1Id === Op5Id){
        res.status(400).json({message: "Choose Another Operator"})
        return 
      }
      if (Op2Id === Op1Id || Op2Id === Op3Id || Op2Id === Op4Id || Op2Id === Op5Id){
        res.status(400).json({message: "Choose Another Operator"})
        return 
      }
      if (Op3Id === Op1Id || Op3Id === Op2Id || Op3Id === Op4Id || Op3Id === Op5Id){
        res.status(400).json({message: "Choose Another Operator"})
        return 
      }
      if (Op4Id === Op1Id || Op4Id === Op2Id || Op4Id === Op3Id || Op4Id === Op5Id){
        res.status(400).json({message: "Choose Another Operator"})
        return 
      }
      if (Op5Id === Op1Id || Op5Id === Op2Id || Op5Id === Op3Id || Op5Id === Op4Id){
        res.status(400).json({message: "Choose Another Operator"})
        return 
      }


      let targetMap = Map.findByPk(+MapId)
      if (!targetMap) {
        res.status(401).json({message: "Map Not Found"})
        return
      } else {
        let newStrat = await Strat.create({
          MapId,
          Op1Id,
          Op2Id,
          Op3Id,
          Op4Id,
          Op5Id,
          currentRole,
          UserId: +id,
          description

        })

        res.status(201).json(newStrat)
      }
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
    }
  }

  static async getOneStrat(req, res, next){
    let {stratId} = req.params
    console.log(stratId)
    try {
      let oneStrat = await Strat.findOne({
        include: [
          'Op1',
          'Op2',
          'Op3',
          'Op4',
          'Op5',
          {
            model: Map
          },
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ],
        where: {
          id: stratId
        }
      })

      oneStrat.dataValues['myOperators'] = []
      oneStrat.dataValues.myOperators.push(oneStrat.dataValues.Op1)
      oneStrat.dataValues.myOperators.push(oneStrat.dataValues.Op2)
      oneStrat.dataValues.myOperators.push(oneStrat.dataValues.Op3)
      oneStrat.dataValues.myOperators.push(oneStrat.dataValues.Op4)
      oneStrat.dataValues.myOperators.push(oneStrat.dataValues.Op5)

      delete oneStrat.dataValues.Op1
      delete oneStrat.dataValues.Op2
      delete oneStrat.dataValues.Op3
      delete oneStrat.dataValues.Op4
      delete oneStrat.dataValues.Op5
      if (!oneStrat){
        res.status(404).json({message: 'Strategy Not Found'})
      }

      res.status(200).json(oneStrat)
    } catch (error) {
      
    }
  }

  static async getMyStrats(req, res, next){
    console.log(req.loggedUser)
    let {id, email, username, role} = req.loggedUser
    try {
      let allStrat = await Strat.findAll({
        include: [
          'Op1',
          'Op2',
          'Op3',
          'Op4',
          'Op5',
          {
            model: Map
          },
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ],
        where: {
          UserId: +id
        }
      })

      let allStrats = allStrat.map((el) => {
        el.dataValues['myOperators'] = []
        el.dataValues.myOperators.push(el.dataValues.Op1)
        el.dataValues.myOperators.push(el.dataValues.Op2)
        el.dataValues.myOperators.push(el.dataValues.Op3)
        el.dataValues.myOperators.push(el.dataValues.Op4)
        el.dataValues.myOperators.push(el.dataValues.Op5)

        delete el.dataValues.Op1
        delete el.dataValues.Op2
        delete el.dataValues.Op3
        delete el.dataValues.Op4
        delete el.dataValues.Op5

        return el
      })
      // console.log(allStrats[0])
      res.status(200).json(allStrats)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Internal server error'})
    }
  }

  static async deleteMyStrat(req, res, next){
    let {id, email, username, role} = req.loggedUser
    let {stratId} = req.params
    console.log(req.params, "<<<<<<<<<<<<<<<<<<<<<,")
    try {
      let deletedStrat = Strat.destroy({
        where: {
          UserId: id,
          id: +stratId
        }
      })

      res.status(200).json({"message": "Your Strat Has Been Banned"})
    } catch (error) {
      res.status(500).json({"message": "Internal server error"})
    }
  }
}

module.exports = Controller