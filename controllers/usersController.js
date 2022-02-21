const {Operator, Map, User, Strat} = require('../models')
const {verifPassword} = require('../helpers/handlePassword')
const {signToken} = require('../helpers/handeJWT')

class Controller{
  static async addNewUser(req, res, next){
    let {username, email, password} = req.body
    console.log(req.body, ">>>>")
    try {
      let newUser = await User.create({
        username,
        email,
        password,
        role: 'player'
      })

      let payload = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
      res.status(201).json(payload)
    } catch (error) {
      console.log(error)
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({message: error.errors[0].message})
      } else{
        res.status(500).json({message: 'Internal sever error'})
      }
    }
  }

  static async loginUser(req, res, next){
    let {email, password} = req.body
    try {
      if (!email){
        res.status(400).json({message: 'Email is required'})
        return
      }

      if (!password){
        res.status(400).json({message: 'Password is required'})
        return
      }

      let targetUser = await User.findOne({
        where: {
          email
        }
      })

      if (!targetUser){
        res.status(401).json({message: 'Invalid Email or Password'})

      } else{
        let isPassword = verifPassword(password, targetUser.password)

        if (!isPassword){
          res.status(401).json({message: 'Invalid Email or Password'})

        } else {
          let payload = {
            id: targetUser.id,
            email: targetUser.email,
            username: targetUser.username,
            role: targetUser.role
          }

          let access_token = signToken(payload)

          res.status(200).json({payload, access_token: access_token})

        }
      }
    } catch (error) {
      
    }
  }
}

module.exports = Controller