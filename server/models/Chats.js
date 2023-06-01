const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema

const Chat = new Schema({
    id: {type: Number},
    users:[User],
    messages:[Message]
})

module.exports = mongoose.model('Chat', Chat)