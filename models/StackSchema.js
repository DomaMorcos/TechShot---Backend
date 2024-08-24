const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const stackSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    imgPath:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Stack',stackSchema)