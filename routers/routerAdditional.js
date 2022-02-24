const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/bitcoin', Controller.getBitcoin)
router.get('/eth', Controller.getEth)
router.get('/data', Controller.getBalance)

module.exports = router