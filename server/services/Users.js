const User = require('../models/Users')

const createUser = async (username, displayName, profilePic) => {
    const user = new User({username, displayName, profilePic})
    return await user.save()
}