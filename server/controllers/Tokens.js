const userService = require('../services/Users')
const tokenService = require('../services/Tokens')
const jwt = require('jsonwebtoken')

const getToken = async (username) => {
    const payload = { username }
    const token = jwt.sign(payload, 'hemi-hemi-is-never-gonna-give-you-up')
    return token
}

const postToken = async (req, res) => {
    try {
        User = await req.json()
        // Check if required request parameters are present
        if (!(User.username && User.password)) {
            res.status(400).send("Invalid request parameters");
            return
        }

        // Check if user already exists
        const existingUser = await tokenService.getUser(User.username, User.password);
        if (existingUser) {
            let token = await getToken(username)
            res.status(200).send(token)
            return
        }
        return res.status(409).send("User doesnt exists");
        // User created successfully
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { postToken }