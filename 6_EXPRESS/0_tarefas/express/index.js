const express = require('express')
const app = express()
const path = require('path')
const basePath = path.join(__dirname, 'templates')
port = 5000

const produtos = require('./produtos')

app.use(express
    .static('public'))


app.use('/produtos', produtos)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})



app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`)
})