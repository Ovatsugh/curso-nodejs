const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pagesqty


    const query = `INSERT INTO books (title, pageqty) VALUES('${title}', '${pageqty}')`
    conn.query(query, function (err) {
        if (err) return console.log(err)
        console.log("Valores inseridos com sucesso")
        res.redirect('/')
    })


})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect((err) => {
    if (err) return console.log(err)
    console.log("Database Conectada")
    app.listen(port)
})

