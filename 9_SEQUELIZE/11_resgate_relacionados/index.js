const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const app = express()
const port = 3000

const User = require('./models/User')
const Address = require('./models/Adress')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', async (req, res) => {

    const users = await User.findAll({ raw: true })
    res.render('home', { users: users })
})



app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const ocuppation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    console.log(newsletter)

    await User.create({ name, ocuppation, newsletter })
    res.redirect('/')
})


app.get('/users/edit/:id', async (req, res) => {

    const id = req.params.id
    try {
        const user = await User.findOne({ include: Address, where: { id: id } })
        res.render('useredit', { user: user.get({ plain: true }) })
        console.log(user.get({ plain: true }).Addresses[0].city)
    } catch (error) {
        console.log(error)

    }
})

app.post('/users/edit/', async (req, res) => {

    const id = req.body.id
    const name = req.body.name
    const ocuppation = req.body.occupation
    let newsletter = req.body.newsletter


    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        ocuppation,
        newsletter
    }

    await User.update(userData, { where: { id: id } })

    res.redirect('/')



})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ raw: true, where: { id: id } })
    res.render('userview', { user: user })
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id: id } })
    res.redirect('/')

})

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    await Address.create({ UserId, street, number, city })
    res.redirect(`/users/edit/${req.body.UserId}`)
})



conn.sync().then(() => {
    app.listen(port)
}).catch((err) => {
    console.log(err)
})
