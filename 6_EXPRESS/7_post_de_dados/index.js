const express = require('express')
const port = 3000
const app = express()

const path = require('path')
const basePath = path.join(__dirname, 'templates')

//ler o body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const users = require('./users')

const checkAuth = function (req, res, next) {
    req.authStatus = true

    if (req.authStatus) {
        console.log('Passou')
        next()
    } else {
        console.log('Não Passou')
        next()
    }
}

app.use(checkAuth)

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`)
})

