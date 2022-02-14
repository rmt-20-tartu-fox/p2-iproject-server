const { checkPassword } = require("../helper/bcrypt")
const { convertToToken } = require("../helper/jwt")

const { User } = require('../models')

class LoginController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw ({
          code: 400,
          name: 'Bad Request',
          message: 'Invalid email or password'
        })
      }

      const isValid = checkPassword(password, user.password)

      if (!isValid) {
        throw ({
          code: 400,
          name: 'Bad Request',
          message: 'Invalid email or password'
        })
      }


      const payload = {
        id: user.id,
        name: user.name, 
        role: user.role
      }
      const token = convertToToken(payload)
      res.status(200).json({ access_token: token, name: user.name, role: user.role })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = LoginController