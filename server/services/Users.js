const User = require('../models/Users')

const createUser = async (username, displayName, profilePic) => {
    try {
        const user = new User({ username, displayName, profilePic })
        await user.save()
        return
    } catch (error) {
        throw error
    }
}

const getUser = async (username) => {
    try {
        const user = await User.findOne({ "username": username }).exec()
        return user
    } catch (error) {
        throw error
    }
};

module.exports = { getUser, createUser }