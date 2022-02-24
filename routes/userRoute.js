const express = require('express')
const router = express.Router()
const Controller = require('../controllers/usersController')

//!Register
router.post('/register', Controller.addNewUser)

//!Login
router.post('/login', Controller.loginUser)



module.exports = router