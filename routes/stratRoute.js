const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stratController')
const {authn} = require('../middlewares/authn.js')


router.get('/', Controller.getAllStrat)


//!Authentication
router.use(authn)
router.post('/', Controller.addNewStrat)


module.exports = router