const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Message = new Schema({
    id: {
        type: Number
    },
    created:{
        type: String,
        default: Date.now
    },
    sender: {
        User
    },
    content:{
        type: String, 
        nullable: true
    }
})
