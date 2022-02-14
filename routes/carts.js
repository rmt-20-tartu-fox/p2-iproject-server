const router = require('express').Router()
const CartController = require('../controllers/carts')
const authorize = require('../middlewares/authorize')

router.get('/', CartController.allCartByUserId)
router.post('/:productId', CartController.addCart)

module.exports = router