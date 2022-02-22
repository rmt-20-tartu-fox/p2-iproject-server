const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.post('/data', Controller.postHistory)
router.get('/data', Controller.getHistory)
router.get('/balance/:BalanceId', Controller.getHistoryByBalance)
router.put('/data/:id', Controller.updateHistory)

// router.get('/total', Controller.getTotal)

module.exports = router