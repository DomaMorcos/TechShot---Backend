const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    details:[{
        imgPath:{
            type:String,
            required:true,
        },
        descriptionParagraph:{
            type:String,
            required:true,
        },
        membersID:[
                {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'TeamMember'  // Assuming 'Item' is the related schema name
            }
        ],
        index: {
            type:Number,
            required:true,
        }
    }]
},{timestamps:true})

module.exports = mongoose.model('Project',projectSchema)