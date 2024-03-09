const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/productController')

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductPost)
router.get('/edit/:id', ProductController.editProduct)
router.post('/edit', ProductController.editProductPost)
router.get('/:id', ProductController.getProduct)
router.post('/remove', ProductController.removeProduct)
router.get('/', ProductController.showProducts)

module.exports = router