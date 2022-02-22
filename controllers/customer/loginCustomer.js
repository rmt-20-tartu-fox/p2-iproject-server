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
        role: user.role
      }
      const token = convertToToken(payload)
      res.status(200).json({
        access_token: token,
        name: user.name,
        role: user.role
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = LoginCustomerController