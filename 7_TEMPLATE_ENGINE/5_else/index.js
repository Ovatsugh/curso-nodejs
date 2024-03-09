const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/', (req, res) => {
    // res.render('home', {layout: false})
    const user = {
        name: 'Gustavo',
        surname: 'Henrique'
    }

    const auth = false
    const approvade = false

    res.render('home', { user: user, auth, approvade})
})

app.listen(3000, () => {
    console.log('App funcionando!')
})