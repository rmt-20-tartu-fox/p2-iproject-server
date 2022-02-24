const {User, Customer, Product, Category, sequelize} = require('../models')

const fetchProducts = async (req, res, next) => {
  try {
    let products = await Product.findAll()
    products = products.map( e => {
      return {id: e.id, name: e.name, price: e.price, discount: e.discount, CategoryId: e.CategoryId, imageUrl: e.imageUrl, status: e.status}
    })
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
      res.status(200).json({id: result[1][0].id, name: result[1][0].name, price: result[1][0].price, discount: result[1][0].discount, CategoryId: result[1][0].CategoryId, imageUrl: result[1][0].imageUrl, status: result[1][0].status})
    }
  } catch (error) {
    next(error)
  }
}

const patchProduct = async (req, res, next) => {
  try {
    const {id} = req.params
    const {status} = req.body
    const find = await Product.findByPk(id)
    if(!find) {
      throw {name: "NotFound", message: `Product with id ${id} is not found`}
    } else {
      if(find.status == status) {
        throw {name: "BadRequest", message: `Status for product with id ${id} is ${status} already`}
      } else {
        await Product.update({status}, {where: {id}})
        res.status(201).json({message: `Status for product with id ${id} has been changed from '${find.status}' to '${status}'`})
      }
    }
  } catch (error) {
    next(error)
  }
}

const removeProduct = async (req, res, next) => {
  try {
    const {id} = req.params
    const find = await Product.findByPk(id)
    if(!find) {
      throw {name: "NotFound", message: `Product with id ${id} is not found`}
    } else {
      await Product.destroy({where: {id}})
      res.status(201).json({message: `Product with id ${id} has been deleted`})
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
  patchProduct
}