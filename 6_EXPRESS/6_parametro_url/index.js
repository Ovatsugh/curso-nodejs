const express = require('express')
const port = 3000
const app = express()

const path = require('path')

const basePath = path.join(__dirname, 'templates')

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

app.get('/users/:id', (req, res) => {
const id = req.params.id

//leitura da tabela users
console.log(`estamos procurando pelo usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`)
})