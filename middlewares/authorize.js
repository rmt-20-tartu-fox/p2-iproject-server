const { Product, User } = require("../models")

async function authorize(req, res, next) {
  try {
    const { token } = req.headers
    const { UserId, role } = req.userLogin
    if (!token) {
      throw ({
        message: 'Let sign in first',
        name: 'Login not yet',
        code: 401
      })
    }

    if (role === 'Admin') {
      next()
    }

    const products = await Product.findAll({
      where: {
        AuthorId: UserId
      }
    })
    if (!products) {
      throw ({
        code: 403,
        name: 'Permission_Not_Enough',
        message: 'Forbidden Access!'
      })
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorize