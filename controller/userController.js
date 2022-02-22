const { User} = require('../models/index')
const { signToken } = require('../helpers/jwt')
const bcrypt = require('bcryptjs');

class UserController {
  static register = async (req, res, next) => {
    try {
      const { email, name, password} = req.body
      const user = await User.create({
        email,
        name,
        password
      })
      res.status(201).json({id:user.id, name:user.name, email:user.email})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static login = async (req, res, next) => {
    try {
      const { email, password} = req.body
      const findUser = await User.findOne({
        where: {email}
      })
      if (findUser) {
        const isValidPassword = bcrypt.compareSync(password, findUser.password)
        if (isValidPassword) {
          const payload = { id: findUser.id, email: findUser.email}
          const token = signToken(payload)
          res.status(200).json({access_token: token})
        } else {
          throw {
            code: 401,
            name: 'Unauthorized',
            message: 'Invalid email/password'
          }
        }
      } else {
        throw {
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email/password'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController