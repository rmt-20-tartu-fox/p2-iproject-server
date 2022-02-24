const {verifyToken} = require('../helpers/handeJWT')
const {Operator, Map, User, Strat} = require('../models')
async function authn(req, res, next){
  let {access_token} = req.headers
  // console.log(access_token)
  try {
    if (!access_token) {
      res.status(401).json({"message": "Invalid token"})
      return
    }
  
    let payload = verifyToken(access_token)
    // console.log(payload)
    let {id, email, username, role} = payload
    let targetedUser = await User.findByPk(+id)
  
    if (!targetedUser){
      res.status(401).json({"message": "Invalid token"})
      return
    } else {
      req.loggedUser = {
        id : targetedUser.id,
        email : targetedUser.email,
        username : targetedUser.username,
        role: targetedUser.role
      }
      // console.log(req.loggedUser)
      next()
    }
  } catch (error) {
    // console.log(error, "AUTHN")
    if (error.name === 'JsonWebTokenError'){
      res.status(401).json({"message": "Invalid token"})
    } else{
      res.status(500).json({"message": "Internal server error"})

    }
  }

}

module.exports = {
  authn
}