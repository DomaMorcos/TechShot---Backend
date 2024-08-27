const mongoose = require('mongoose')
const Project = require('./ProjectSchema')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    git: {
        type: String,
        required: true
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'  // Reference to the Project schema
    }],
    imgPath: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('TeamMember', memberSchema)