const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    name : { type : String ,required : true},
    email : { type : String , required : true, unique: true},
    password : { type : String,required: true},
    username : { type : String, required: true, unique: true},
    dp : { type : String },
    coubs : { type : Array },
    hearts : { type : Array },
    bookmarks : { type : Array }
},{timestamps : true})

module.exports = users = mongoose.model("users" , userSchema);