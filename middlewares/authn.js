const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)
    if (!user) {
      throw {
        code: 401,
        name: 'Invalid User',
        message: 'Invalid token or user'
      }
    } 

    req.userLogin = {
      id: user.id,
      email: user.email
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication