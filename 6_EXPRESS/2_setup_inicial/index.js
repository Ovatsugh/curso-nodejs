const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => {
    res.send('./index.hml')
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`)
})