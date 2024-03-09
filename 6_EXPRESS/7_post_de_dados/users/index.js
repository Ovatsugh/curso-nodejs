const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/usersform.html`)
})

router.post('/save', (req, res) => {
    
    console.log(`o nome do usuário é ${req.body.name} e ele tem ${req.body.age} anos`)
    res.sendFile(`${basePath}/usersform.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users
    console.log(`estamos procurando pelo usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})


module.exports = router