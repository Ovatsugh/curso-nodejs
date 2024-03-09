const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongoose')
    console.log('Mongoose conectado')
}

main().catch((err) => console.log('aconteceu um erro: ' + err))


module.exports = mongoose


