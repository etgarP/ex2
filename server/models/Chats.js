const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Chat = new Schema({
    id: {type: Number},
    users:[User],
    messages:[Message]
})

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
module.exports = {
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message)
};
