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
          }
        ]
      })

      res.status(200).json(allStrat)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Internal server error'})
    }
  }

  static async addNewStrat(req, res, next){
    // console.log("OK")
    let {currentRole, MapId, Op1Id, Op2Id, Op3Id, Op4Id, Op5Id} = req.body
    console.log(currentRole, MapId, Op1Id, Op2Id, Op3Id, Op4Id, Op5Id)
    let {id, email, role, username} = req.loggedUser
    try {

      if (currentRole !== 'Defend' || currentRole === 'Attack'){
        res.status(400).json({message: "Choose Your Side"})
        return
      }
      if (!MapId){
        res.status(400).json({message: "Choose A Map"})
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
          UserId: +id

        })

        res.status(201).json(newStrat)
      }
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
    }
  }
}

module.exports = Controller