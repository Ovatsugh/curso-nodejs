const express = require('express')
const path = require('path')
const basePath = path.join(__dirname, '../templates')
const router = express.Router()

router.get('/limpeza', (req, res) => {
    res.sendFile(`${basePath}/limpeza.html`)
})

router.get('/lazer', (req, res) => {
    res.sendFile(`${basePath}/lazer.html`)
})

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/produtos.html`)
})

module.exports = router