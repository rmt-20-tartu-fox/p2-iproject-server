const router = require('express').Router()

const register = require('./register')
const products = require('./products')
const login = require('./login')
const carts = require('./carts')
const authentication = require('../middlewares/authentication')

router.use('/register', register)
router.use('/login', login)

router.use(authentication)

router.use('/products', products)
router.use('/carts', carts)

module.exports = router