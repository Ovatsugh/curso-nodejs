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

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    res.render('home', { users: users})
})



app.get('/users/create', (req, res) => {
    console.log('BBBBB')
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    console.log('AAAAAAAa')
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

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id: id}})
    res.render('userview', {user: user})
})


conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})
