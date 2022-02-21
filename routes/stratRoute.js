const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stratController')
const {authn} = require('../middlewares/authn.js')


router.get('/', Controller.getAllStrat)

router.get('/:stratId', Controller.getOneStrat)

//!Authentication
router.use(authn)
router.post('/', Controller.addNewStrat)


module.exports = router