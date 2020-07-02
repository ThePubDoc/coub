const mongoose = require("mongoose")

const schema = mongoose.Schema

const coubSchema = new schema({
    url : { type : String, required : true},
    caption : { type : String },
    tags : { type : Array },
    authorUsername : { type : String, required: true},
    author : { type : String, required : true },
    hearts : { type : Number, default : 0 },
    views : { type : Number, default : 0},
},{timestamps : true})

module.exports = coubs = mongoose.model("coubs" , coubSchema);