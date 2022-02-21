const {User, Customer, Product, Category, sequelize} = require('../models')
const {hashPassword} = require('../helpers/bcrypt')

const register = async (req, res, next) => {
  try {
    const {firstname, email, password} = req.body
    const password = hashPassword(password)
    const result = User.create({firstname, email, password})
    res.status(201).json({id: result.id, firstname: result.firstname, email: result.email})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register
}