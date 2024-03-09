const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.set('view engine', 'handlebars')
const hbs = exphbs.create({
    partialsDir: ["views/partials"],
})
//app.engine('handlebars', hbs.engine())
app.engine('handlebars', hbs.engine)


app.get('/dashboard', (req, res) => {
    const items = ['item a', 'item b', 'item c', 'item d']

    res.render('dashboard', { items })
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender NodeJS',
        author: 'Gustavo'
    }
    res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'NodeJS',
            category: 'javascript',
            body: 'Alguma descrição aqui',
            comments: 4

        },

        {
            title: 'Spring Boot',
            category: 'Java',
            body: 'Alguma descrição aqui',
            comments: 3

        },

        {
            title: 'Laravel',
            category: 'PHP',
            body: 'Alguma descrição aqui',
            comments: 5

        }
    ]

    res.render('blog', { posts })
})

app.get('/', (req, res) => {
    // res.render('home', {layout: false})
    const user = {
        name: 'Gustavo',
        surname: 'Henrique'
    }

    const auth = false
    const approvade = false

    res.render('home', { user: user, auth, approvade })
})

app.listen(3000, () => {
    console.log('App funcionando!')
})