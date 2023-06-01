const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema

const Message = new Schema({
    id: {
        type: Number
    },
    created:{
        type: stringify(Date.now)
    },
    sender: {
        User
    },
    content:{
        type: String, 
        nullable: true
    }
})

module.exports = mongoose.model('Message', Message)