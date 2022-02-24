const express = require('express')
const router = express.Router()
const Controller = require('../controllers/friendController')



router.post('/', Controller.getMyFriend)

router.get('/', Controller.getNews)


module.exports = router