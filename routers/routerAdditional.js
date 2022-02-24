const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/btc', Controller.getCrypto)
router.get('/usd', Controller.getForex)

module.exports = router