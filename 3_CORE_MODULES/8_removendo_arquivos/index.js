const fs = require('fs')

fs.unlink('arquivo.txt', function (err) { // existe o rename tbm
    if(err) {
        console.log(err)
    } else {
        console.log('sucess')
    }
})