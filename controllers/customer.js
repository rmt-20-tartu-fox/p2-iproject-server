const {User, Customer, Product, Category, sequelize} = require('../models')

const fetchCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll()
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
}

const addCustomer = async (req, res, next) => {
  try {
    const {firstname, lastname, email, address, password, imageUrl, point, phoneNumber} = req.body
    const result = await Customer.create({firstname, lastname, email, address, password, imageUrl, point: 0, phoneNumber})
    res.status(201).json({id: result.id, firstname: result.firstname, lastname: result.lastname, email: result.email, address: result.address, imageUrl: result.imageUrl, point: result.point, phoneNumber: result.phoneNumber})
  } catch (error) {
    next(error)
  }
}

const editCustomer = async (req, res, next) => {
  try {
    const {id} = req.params
    const {firstname, lastname, password, imageUrl, point, address, phoneNumber} = req.body
    const find = await Customer.findByPk(id)
    if(!find) {
      throw {name: "NotFound", message: `Customer with id ${id} is not found`}
    } else {
      const result = await Customer.update({firstname, lastname, address, password, imageUrl, phoneNumber}, {
        where: {id},
        returning: true
      })
      res.status(200).json({id: result[1][0].id, firstname: result[1][0].firstname, lastname: result[1][0].lastname, email: result[1][0].email, address: result[1][0].address, imageUrl: result[1][0].imageUrl, point: result[1][0].point, phoneNumber: result[1][0].phoneNumber})
    }
  } catch (error) {
    next(error)
  }
}

const removeCustomer = async (req, res, next) => {
  try {
    const {id} = req.params
    await Customer.destroy({where: {id}})
    res.status(201).json({message: `Customer with id ${id} has been deleted`})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchCustomers,
  addCustomer,
  editCustomer,
  removeCustomer
}