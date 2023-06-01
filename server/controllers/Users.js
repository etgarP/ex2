const userService = require('../services/Users')

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username, req.body.displayName, req.body.profilePic))
}
