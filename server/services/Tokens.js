const UserPassName = require('../models/Tokens.js')

const createUserPassname = async (username, password, displayName, profilePic) => {
    try {
        const user = new UserPassName({ username, password, displayName, profilePic })
        await user.save()
        return
    } catch (error) {
        throw error
    }
}

const getUserPassName = async (username, password) => {
    try {
        const user = await UserPassName.findOne({ username, password }).exec()
        return user
    } catch (error) {
        throw error
    }
};

module.exports = { createUserPassname, getUserPassName }