const router = require('express').Router()
const RegisterController = require('../controllers/register')

router.post('/', RegisterController.register)

module.exports = router