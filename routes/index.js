const express = require('express')
const router = express.Router()
const operatorRoute = require('./operatorRoute')
const mapRoute = require('./mapRoute')
const userRoute = require('./userRoute')
const stratRoute = require('./stratRoute')


//!Route Operator
router.use('/operators', operatorRoute)

//!Route Map
router.use('/maps', mapRoute)

//!Route User
router.use('/users', userRoute)



router.use('/strats', stratRoute)


module.exports = router