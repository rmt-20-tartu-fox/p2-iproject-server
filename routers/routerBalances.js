const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.post('/data', Controller.postBalance)
router.get('/data', Controller.getBalance)

module.exports = router