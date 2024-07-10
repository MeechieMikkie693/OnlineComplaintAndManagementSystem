const mongoose = require('mongoose')

//defining the schema
const userSchema = new mongoose.Schema({
    roll: String,
    email: String,
    role: String,
    pass: String         //String and Number shd start with a capital number
},{ versionKey: false })

//defining the model
const User = mongoose.model('users',userSchema)   //(collection,schema)

module.exports = User;