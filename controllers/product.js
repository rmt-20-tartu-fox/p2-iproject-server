const {User, Customer, Product, Category, sequelize} = require('../models')

const fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const {name, price, discount, CategoryId, imageUrl} = req.body
    const result = await Product.create({name, price, discount, CategoryId, imageUrl})
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchProducts,
  addProduct
}