const {Operator, Map, User, Strat} = require('../models')

async function authz(req, res, next){
  let {id, email, username, role} = req.loggedUser
  console.log(req.params)
  let {stratId} = req.params

  try {
    let targetedStrat = await Strat.findByPk(+stratId)
    if (!targetedStrat){
      res.status(404).json({message: 'Strategy Not Found'})
      return
    }

    let findedStrat = await Strat.findOne({
      where: {
        UserId: id,
        id: +stratId
      }
    })

    if (!findedStrat){
      res.status(403).json({message: 'You Are Unauthorized'})
      return
    } else {
      next()
    }

  } catch (error) {
    res.status(500).json({"message": "Internal server error"})
  }
}

module.exports = {
  authz
}