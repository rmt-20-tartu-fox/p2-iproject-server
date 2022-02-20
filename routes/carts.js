const router = require('express').Router()
const CartController = require('../controllers/customer/carts')

router.get('/', CartController.allCartByUserId)
router.delete('/', CartController.removeAllCarts)
router.put('/checkout', CartController.checkout)
router.delete('/:id', CartController.removeCartById)
router.patch('/:id/select', CartController.selectCart)
router.patch('/:id/unselect', CartController.unselectCart)
router.post('/:productId', CartController.addCart)

module.exports = router