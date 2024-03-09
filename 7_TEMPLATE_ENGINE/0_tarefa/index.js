const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())

const produtos = [
    {
        id: 1,
        name: 'Aspirador',
        fabricante: 'Samsung',
        quantidade: 6
    },
    {
        id: 2,
        name: 'Celular',
        fabricante: 'Xiaomi',
        quantidade: 7
    },
    {
        id: 3,
        name: 'Capinha',
        fabricante: 'China',
        quantidade: 15
    },
    {
        id: 4,
        name: 'Fone',
        fabricante: 'Lenovo',
        quantidade: 8
    }
]


app.get('/', (req, res) => {
    res.render('home', { produtos })
})

app.get('/produto/:id', (req, res) => {
    const id = req.params.id
    const produto = produtos[parseInt(id) - 1]
    res.render('produto', { produto })
})

app.listen(3000, () => {
    console.log('App Funcionando')
})