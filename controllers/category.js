const {User, Customer, Product, Category, sequelize} = require('../models')

const fetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

const addCategory = async (req, res, next) => {
  try {
    const {name} = req.body
    const result = await Category.create({name})
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchCategories,
  addCategory
}