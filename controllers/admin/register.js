const {
  User
} = require('../../models')

class RegisterController {
  static async register(req, res, next) {
    try {
      const {
        name,
        email,
        password
      } = req.body
      const payload = {
        name,
        email,
        password,
        role: 'Customer'
      }
      const result = await User.create(payload)
      res.status(201).json({
        id: result.id,
        name: result.name,
        email: result.email
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RegisterController