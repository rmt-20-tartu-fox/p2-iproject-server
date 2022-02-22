const express = require('express')
const router = express.Router()
const Controller = require('../controllers/friendController')
const {authn} = require('../middlewares/authn.js')


router.post('/', Controller.getMyFriend)


module.exports = router