const HistoryController = require('../controllers/customer/history')
const router = require('express').Router()

router.get('/', HistoryController.getHistories)

module.exports = router