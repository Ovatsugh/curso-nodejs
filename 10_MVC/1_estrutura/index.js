const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

//models
const Task = require('./models/Task')

//rotas
const taskRoutes = require('./routes/tasksRouters')
const contactRoutes = require('./routes/contactRouters')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('home')
})

app.use('/tasks', taskRoutes)
app.use('/about', contactRoutes)

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
});