const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const app = express()
const port = 3000

const User = require('./models/User')


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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const ocuppation = req.body.occupation
    let newsletter = req.body.newsletter

    console.log(name, ocuppation, newsletter)

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({ name, ocuppation, newsletter })
    res.redirect('/')
})

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})
