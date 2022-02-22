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
    const result = await Product.create({name, price, discount, CategoryId, imageUrl, status: 'active'})
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

const editProduct = async (req, res, next) => {
  try {
    const {id} = req.params
    const {name, price, discount, CategoryId, imageUrl} = req.body
    const find = await Product.findByPk(id)
    if(!find) {
      throw {name: "NotFound", message: `Product with id ${id} is not found`}
    } else {
      const result = await Product.update({name, price, discount, CategoryId, imageUrl}, {
        where: {id},
        returning: true
      })
      const data = result[1][0].map( e => {
        return {id: e.id, name: e.name, price: e.price, discount: e.discount, CategoryId: e.CategoryId, imageUrl: e.imageUrl, status: e.status}
      })
      res.status(200).json(data)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchProducts,
  addProduct
}