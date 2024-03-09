const Product = require('../models/Product')

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.find().lean()
        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        const name = req.body.name
        const img = req.body.img
        const price = req.body.price
        const description = req.body.description

        const product = new Product({ name, img, price, description })
        await product.save();
        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const id = req.params.id
        const product = await Product.findById(id).lean()
        res.render('products/product', { product })

    }

    static async editProduct(req, res) {
        const id = req.params.id
        const product = await Product.findById(id).lean()
        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const img = req.body.img

        await Product.updateOne({ _id: id }, { name, img, price, description })

        res.redirect('/products')
    }

    static async removeProduct(req, res) {
        const id = req.body.id

        await Product.deleteOne({_id: id})
        res.redirect('/products')

    }
}