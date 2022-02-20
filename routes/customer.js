const LoginCustomerController = require('../controllers/loginCustomer')
const RegisterCustomerController = require('../controllers/registerCustomer')
const router = require('express').Router()

router.post('/login', LoginCustomerController.login)
router.post('/register', RegisterCustomerController.register)

module.exports = router