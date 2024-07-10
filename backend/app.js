const bcrypt = require('bcrypt')
const express = require('express')
const mongoose = require('mongoose')    //including mongoose
const userRouter = require('./userRoutes')
const cors = require('cors')
const app = express()
const PORT = 8000;


app.use(
    cors({
        origin:'http://localhost:3000'
    })
) //we're telling the backend that it can access this url

mongoose.connect('mongodb://localhost:27017/new_demo')   //connecting to the database using mongoDB. URL- copy from connection in compass + 'new_demo' (database we are using).
//if connection is not established, write 127.0.0.1 instead of localhost.
.then(()=>{
    console.log('connection is established')
})
.catch((err)=>{
    console.log('error connecting to the Database',err.message)
})

app.use(express.json()) //middleware
app.use(userRouter)

app.listen(PORT,()=>{
    console.log(`App is served on ${PORT}`)
})