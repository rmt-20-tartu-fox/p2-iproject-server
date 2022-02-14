const router = require('express').Router()
const ProductController = require('../controllers/products')
const authorize = require('../middlewares/authorize')

router.get('/', ProductController.allProduct)
router.post('/', ProductController.addProduct)
router.patch('/:productId/increment', authorize, ProductController.incrementStock)
router.patch('/:productId/decrement', authorize, ProductController.decrementStock)
router.patch('/:productId/status', authorize, ProductController.productStatus)
router.get('/:productId', ProductController.productById)
router.delete('/:productId', authorize, ProductController.removeProduct)
router.put('/:productId', authorize, ProductController.updateProduct)


module.exports = router