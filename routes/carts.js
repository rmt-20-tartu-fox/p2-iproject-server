const router = require('express').Router()
const CartController = require('../controllers/customer/carts')
const authorize = require('../middlewares/authorize')

router.get('/', CartController.allCartByUserId)
router.delete('/', authorize,CartController.removeAllCarts)
router.put('/checkout', CartController.checkout)
router.delete('/:id', authorize,CartController.removeCartById)
router.patch('/:id/increment', CartController.quantityInc)
router.patch('/:id/decrement', CartController.quantityDec)
router.patch('/:id/select', CartController.selectCart)
router.patch('/:id/unselect', CartController.unselectCart)
router.post('/:productId', CartController.addCart)

module.exports = router