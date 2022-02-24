const express = require('express')
const router = express.Router()
const routerUser = require('./routerUsers')
const routerHistory = require('./routerHistories.js')
const routerBalance = require('./routerBalances.js')
const routerAdditional = require('./routerAdditional.js')
const authentication = require('../middleware/authentication')

router.get('/', (req, res) => {
  res.send('welcome to my life')
})

router.use('/users', routerUser)
router.use('/balances', authentication, routerBalance)
router.use('/histories', authentication, routerHistory)
router.use('/additionals', authentication, routerAdditional)

module.exports = router