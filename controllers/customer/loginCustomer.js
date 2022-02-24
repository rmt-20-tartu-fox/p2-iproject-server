const {
  checkPassword
} = require("../../helper/bcrypt")
const {
  convertToToken
} = require("../../helper/jwt")

const {
  User
} = require('../../models')

class LoginCustomerController {
  static async login(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body

      if (!email || !password) {
        throw ({
          code: 400,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        })
      }
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw ({
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        })
      }

      const isValid = checkPassword(password, user.password)

      if (!isValid) {
        throw ({
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        })
      }


      const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      }
      const token = convertToToken(payload)
      res.status(200).json({
        access_token: token,
        name: user.name,
        role: user.role,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const {
        token
      } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
      })
      const payload = ticket.getPayload();
      const name = payload.email
      const result = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          username: name,
          password: payload.at_hash,
          role: "customer",
        }
      })
      const tokenGenerate = convertToToken({
        id: result[0].id
      })
      res.status(200).json({
        accessToken: tokenGenerate,
        name: result[0].username,
        role: result[0].role
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = LoginCustomerController