const LoginCustomerController = require('../controllers/customer/loginCustomer')
const RegisterCustomerController = require('../controllers/customer/registerCustomer')
const router = require('express').Router()

router.post('/login', LoginCustomerController.login)
router.post('/register', RegisterCustomerController.register)

module.exports = router