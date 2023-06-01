const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserPassName = new Schema({
    username: {
        type: string,
        required: true,
        nullable: true
    },
    password: {
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

module.exports = mongoose.model('UserPassName', UserPassName)