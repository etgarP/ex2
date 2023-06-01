const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Chat = new Schema({
    id: { type: Number },
    users:[{ type: User }],
    messages:[{ type: Message }]
})

const Message = new Schema({
    id: {
        type: Number
    },
    created:{
        type: Date,
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

module.exports = {
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message)
};
