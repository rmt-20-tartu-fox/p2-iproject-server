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

const editCategory = async (req, res, next) => {
  try {
    const {id} = req.params
    const {name} = req.body
    const find = await Category.findByPk(id)
    if(!find) {
      throw {name: "NotFound", message: `Category with id ${id} is not found`}
    } else {
      const result = await Category.update({name}, {
        where: {id},
        returning: true
      })
      res.status(200).json(result[1][0])
    }
  } catch (error) {
    next(error)
  }
}

const removeCategory = async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await Category.destroy({where: {id}})
    res.status(201).json({message: `Category with id ${id} has been deleted`})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory
}