const {
  extractToken
} = require('../helper/jwt')
const {
  User
} = require('../models')

async function authentication(req, res, next) {
  try {
    const {
      token
    } = req.headers
    if (!token) {
      throw ({
        code: 401,
        name: 'Login not yet',
        message: 'let Sign in first'
      })
    }

    const payload = extractToken(token)
    const user = await User.findByPk(payload.data.id)
    if (!user) {
      throw ({
        code: 401,
        name: 'Invalid User',
        message: 'Invalid User'
      })
    }

    req.userLogin = {
      UserId: payload.data.id,
      name: payload.data.name,
      role: payload.data.role
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication