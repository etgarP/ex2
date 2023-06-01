const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: string,
        required: true,
        nullable: true
    },
    displayName: {
        type: string,
        required: true,
        nullable: true
    },
    profilePic: {
        type: string,
        required: true,
        nullable: true
    }
})

module.exports = mongoose.model('User', User)
