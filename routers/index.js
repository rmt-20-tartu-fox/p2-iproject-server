const express = require('express')
const router = express.Router()
const routerUser = require('./routerUsers')
const routerBalance = require('./routerBalances.js')
const authentication = require('../middleware/authentication')

router.get('/', (req, res) => {
  res.send('welcome to my life')
})

router.use('/users', routerUser)
router.use('/balances', authentication, routerBalance)

module.exports = router