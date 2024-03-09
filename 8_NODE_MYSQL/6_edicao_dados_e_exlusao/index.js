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

app.get('/books', (req, res) => {
    const querybooks = `SELECT * FROM books `
    conn.query(querybooks, function (err, data) {
        if (err) return console.log(err)
        const books = data
        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ${id} `

    conn.query(query, function (err, data) {
        if (err) return console.log(err)
        const book = data[0]
        res.render('book', { book })

    })
})

app.get('/books/edit/:id', (req, res) => {
    {
        const id = req.params.id
        const query = `SELECT * FROM books WHERE id = ${id}`
        conn.query(query, function (err, data) {
            if (err) return console.log(err)
            const book = data[0]
            res.render('editbook', { book })
        })
    }
})

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pages = req.body.pagesqty
    const query = `UPDATE books SET title = '${title}', pageqty = '${pages}' WHERE id = ${id};`
    conn.query(query, function (err) {
        if (err) return console.log(err)
        res.redirect('/books')
    })
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pagesqty


    const query = `INSERT INTO books (title, pageqty) VALUES('${title}', '${pageqty}')`
    conn.query(query, function (err) {
        if (err) return console.log(err)
        res.redirect('/books')
    })

})

app.get('/books/delete/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM books WHERE id = ${id}`
    conn.query(query, function (err) {
        if (err) return console.log(err)
        res.redirect('/books')
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

