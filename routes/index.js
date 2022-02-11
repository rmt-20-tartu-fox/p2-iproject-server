const express = require('express')
const router = express.Router()
const operatorRoute = require('./operatorRoute')
const mapRoute = require('./mapRoute')

//!Route Operator
router.use('/operators', operatorRoute)

//!Route Map
router.use('/maps', mapRoute)

module.exports = router