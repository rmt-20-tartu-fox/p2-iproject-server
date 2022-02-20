const ProductCustomerController = require('../controllers/customer/productsCustomer')
const router = require('express').Router()

router.get('/', ProductCustomerController.allProduct)
module.exports = router