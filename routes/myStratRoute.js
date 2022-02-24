const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stratController')
const {authn} = require('../middlewares/authn.js')
const {authz} = require('../middlewares/authz.js')


//!Authentication
router.use(authn)

router.get('/', Controller.getMyStrats)


router.delete('/:stratId', authz, Controller.deleteMyStrat)



module.exports = router