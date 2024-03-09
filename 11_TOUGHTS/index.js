const express = require('express')
const app = express()
const exphb = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const port = 3000

//import Models
const Tought = require('./models/Tought')
const User = require('./models/User')

//impor Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//import controller
const ToughtController = require('./controllers/ToughtController')


// config files
app.use(express.json())
app.set('view engine', 'handlebars')
app.engine('handlebars', exphb.engine())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false, // caiu a sessão ele vai desconectar
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {}, //configurar a sessão por arquivos
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 3600000 ),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

//set session to res
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session //se o usuário tem algo na sessão, eu sigo com dos dados dele
    }

    next()
})

//routes
app.use('/toughts', toughtsRoutes)
app.get('/', ToughtController.showToughts)
app.use('/', authRoutes)




// connection
conn.sync().then(() => {
    app.listen(port)
}).catch((err) => {
    console.log(err)
})

