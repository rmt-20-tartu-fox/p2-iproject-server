const express = require('express');
const router = express.Router()
const { authentication } = require('../middlewares/authn')
const userRouter = require('./user')

router.use('/', userRouter)

// router.use(
//   authentication
// )

module.exports = router