const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required:true,
        unique:true
    },
    redirectURL: {
        type: String,
        required:true,
    },
    visitHistory: [{timestamp:{type:Date}}]
},{timestamps:true})

const URL = mongoose.model('URL',urlSchema)
module.exports = URL