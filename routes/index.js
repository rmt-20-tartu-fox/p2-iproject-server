const express = require('express')
const router = express.Router()
const operatorRoute = require('./operatorRoute')
const mapRoute = require('./mapRoute')
const userRoute = require('./userRoute')
const stratRoute = require('./stratRoute')
const friendRoute = require('./friendRoute')
const myStratRoute = require('./myStratRoute')


//!Route Operator
router.use('/operators', operatorRoute)

//!Route Map
router.use('/maps', mapRoute)

//!Route User
router.use('/users', userRoute)


router.use('/strats', stratRoute)
router.use('/mystrats', myStratRoute)

//!Route
router.use('/friends', friendRoute)


module.exports = router