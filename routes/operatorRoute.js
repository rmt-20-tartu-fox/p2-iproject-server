const express = require('express')
const router = express.Router()
const Controller = require('../controllers/operatorsController')

//!Get All Operator
router.get('/', Controller.getAllOperator)

router.get('/:operatorId', Controller.getOneOperator)



module.exports = router