const express = require('express')
const router = express.Router()
const Controller = require('../controllers/operatorsController')

//!Get All Operator
router.get('/', Controller.getAllOperator)



module.exports = router