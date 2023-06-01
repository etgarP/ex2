const userService = require('../services/Users')
const tokenService = require('../services/Tokens')
const jwt = require('jsonwebtoken')

const postUser = async (req, res) => {
    try {
        // Check if required request parameters are present
        User = await req.json()
        if (!(User.username && User.password && User.displayName && User.profilePic)) {
            res.status(400).send("Invalid request parameters");
            return 
        }

        // Check if user already exists
        const existingUser = await userService.getUser(User.username);
        if (existingUser) {
            res.status(409).send("User already exists");
            return 
        }

        // Create the user
        await userService.createUser(User.username, User.displayName, User.profilePic);
        await userService.createUserPassname(User.username, User.displayName, User.profilePic);

        // User created successfully
        res.status(200);
        return 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
        return 
    }
};

const getUser = async (req, res) => {
    try {
        const words = req.body.split(' ');
        const token = words[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const existingUser = await tokenService.getUser(decoded.username);
        if (existingUser) {
            res.status(200).send(existingUser);
            return 
        }
    } catch (error) {
        res.status(401).send("Unable to authenticate");
        return 
    }
}

module.exports = { postUser, getUser } 