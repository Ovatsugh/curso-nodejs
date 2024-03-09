const express = require('express');
const exphb = require('express-handlebars');
const app = express()
const conn = require('./db/conn')

// import routes
const productsRoutes = require('./routes/productsRoutes')

//config
app.engine('handlebars', exphb.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.static('public'))
app.use(express.json())

//routes
app.use('/products', productsRoutes)
app.listen(3000)