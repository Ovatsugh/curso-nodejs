const fs = require('fs')

function existe(path) {
    if(!fs.existsSync(path)) {
        console.log('Não existe')
    } else {
        console.log('Existe')
    }
}

existe('./arquivos')

fs.mkdirSync('arquivos')

existe('./arquivos')
