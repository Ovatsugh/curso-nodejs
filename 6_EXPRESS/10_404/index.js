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

// arquivos estáticos
app.use(express.static('public'))

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/usersform.html`)
})

app.post('/users/save', (req, res) => {
    
    console.log(`o nome do usuário é ${req.body.name} e ele tem ${req.body.age} anos`)
    res.sendFile(`${basePath}/usersform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users
    console.log(`estamos procurando pelo usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

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

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`)
})

