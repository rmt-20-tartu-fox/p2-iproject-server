const {
  User
} = require('../..//models')

class RegisterCustomerController {
  static async register(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        noTelp
      } = req.body
      const payload = {
        name,
        email,
        password,
        role: 'Customer',
        noTelp
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

module.exports = RegisterCustomerController