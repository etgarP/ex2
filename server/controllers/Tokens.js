const tokenService = require('../services/Tokens')
const jwt = require('jsonwebtoken')

const getToken = async (username) => {
    const payload = { username }
    const token = jwt.sign(payload, 'hemi-hemi-is-never-gonna-give-you-up')
    return token
}

const postToken = async (req, res) => {
    try {
        var user = req.body
        console.log(user)
        // Check if required request parameters are present
        if (!(user.username && user.password)) {
            return res.status(400).send("Invalid request parameters");
            
        }

        // Check if user already exists
        const existingUser = await tokenService.getUserPassName(user.username, user.password);
        if (existingUser) {
            let token = await getToken(user.username)
            return res.status(200).send(token)
        }
        return res.status(409).send("User doesnt exists");
        // User created successfully
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { postToken }