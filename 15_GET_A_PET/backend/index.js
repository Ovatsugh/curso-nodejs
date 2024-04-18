const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')

const app = express()

//config JSON response 
app.use(express.json())

//Solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//public folders
app.use(express.static('public'))
//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetsRoutes = require('./routes/PetsRoutes')
app.use('/users', UserRoutes)
app.use('/pets', PetsRoutes)


//listen
app.listen(5000)