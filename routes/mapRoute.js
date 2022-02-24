const express = require('express')
const router = express.Router()
const Controller = require('../controllers/mapController')

//!Get All Map
router.get('/', Controller.getAllMap)

module.exports = router