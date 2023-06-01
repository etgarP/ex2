const userService = require('../services/Users')
const tokenService = require('../services/Tokens')
const jwt = require('jsonwebtoken')

const getToken = async (username) => {
    const payload = { username }
    const token = jwt.sign(payload, 'hemi-hemi-is-never-gonna-give-you-up')
    return token
}

const postUser = async (req, res) => {
    try {
        // Check if required request parameters are present
        if (!(req.body.username && req.body.password && req.body.displayName && req.body.profilePic)) {
            return res.status(400).send("Invalid request parameters");
        }

        // Check if user already exists
        const existingUser = await userService.getUser(req.body.username);
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        // Create the user
        await userService.createUser(req.body.username, req.body.displayName, req.body.profilePic);
        await userService.createUserPassname(req.body.username, req.body.displayName, req.body.profilePic);

        // User created successfully
        let token = getToken(username)
        return res.status(200).send(token);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const getUser = async (req, res) => {
    try {
        const words = req.body.split(' ');
        const token = words[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const existingUser = await tokenService.getUser(decoded.username);
        if (existingUser) {
            return res.status(200).send(existingUser);
        }
    } catch (error) {
        return res.status(401).send("Unable to authenticate");
    }
}

module.exports = { postUser } 