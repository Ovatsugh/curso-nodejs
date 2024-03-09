const conn = require('../db/conn')
const { ObjectId } = require('mongodb')

class Product {

    constructor(name, img, price, description) {
        this.name = name,
        this.img = img
        this.price = price
        this.description = description
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            img: this.img,
            price: this.price,
            description: this.description
        })

        return product
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray()
        return products
    }

    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) })
        return product

    }


    static async removeProduct(id) {
        await conn
          .db()
          .collection('products')
          .deleteOne({ _id: new ObjectId(id) })
    
        return
      }

     updateProduct(id) {
         conn
          .db()
          .collection('products')
          .updateOne({ _id: new ObjectId(id) }, { $set: this })
        return
      }

      
    }    



module.exports = Product