const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const dotenv_expand =require('dotenv-expand') 
const  { BooksRoute, AuthorsRoute, UsersRoute } = require('./src/api/routes/')
const app = express()
const middlewares = new (require('./src/api/middlewares/JWTAuth'))
dotenv_expand(dotenv)
require('./src/config/database')

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/books', middlewares.verify, BooksRoute )
app.use('/api/authors', middlewares.verify, AuthorsRoute )
app.use('/api/user', middlewares.nonJWT, UsersRoute )
const { PORT } =process.env
app.listen(PORT, ()=>{                       
    console.log(`Server is listening to port ${PORT}`)
})