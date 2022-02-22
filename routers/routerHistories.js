const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.post('/data', upload.single('image'), Controller.postHistory)
router.get('/data', Controller.getHistory)
router.get('/balance/:BalanceId', Controller.getHistoryByBalance)
router.put('/data/:id', Controller.updateHistory)

// router.get('/total', Controller.getTotal)

module.exports = router