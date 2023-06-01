const mongoose = require('mongoose')
const User = require('../models/Users')

const Schema = mongoose.Schema

const Message = new Schema({
    id: { type: Number },
    created:{ type: Date, default: Date.now },
    sender: { type: User },
    content:{ type: String, nullable: true }
})

const Chat = new Schema({
    id: { type: Number },
    users:[{ type: User }],
    messages:[{ type: Message }]
})

module.exports = {
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message)
};
