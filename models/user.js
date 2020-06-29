const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    name : { type : String ,required : true},
    email : { type : String , required : true, unique: true},
    password : { type : String,required: true},
    username : { type : String, required: true, unique: true},
    dp : { type : String }
},{timestamps : true})

module.exports = users = mongoose.model("users" , userSchema);