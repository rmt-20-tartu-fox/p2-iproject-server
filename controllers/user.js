const {User, Customer, Product, Category, sequelize} = require('../models')
const {getToken} = require('../helpers/jwt')
const {validatePassword} = require('../helpers/bcrypt')

const fetchUsers = async (req, res, next) => {
  try {
    const user = await User.findAll()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const {firstname, email, password} = req.body
    const result = await User.create({firstname, email, password})
    console.log(result);
    res.status(201).json({id: result.id, firstname: result.firstname, email: result.email})
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    let error = null
    !email ? error = {name: "ValidationError", message: "Email cannot be empty"} : ''
    !password ? error = {name: "ValidationError", message: "Password cannot be empty"} : ''
    if(error) {
      throw error
    } else {
      const user = await User.findOne({where: {email}})
      if(!user) {
        throw {name: "WrongCredentials"}
      } else {
        if(validatePassword(password, user.password)) {
          const payload = {id: user.id, email: user.email, firstname: user.firstname}
          const access_token = getToken(payload)
          res.status(200).json({access_token})
        } else {
          throw {name: "WrongCredentials"}
        }
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  fetchUsers
}