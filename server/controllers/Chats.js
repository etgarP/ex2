const chatService = require('../services/Chats')
const jwt = require('jsonwebtoken')

//Returns array with 
const getChats = async (req, res) => {
    let decoded
    try {
        const words = req.body.split(' ');
        const token = words[1];
        decoded = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up');
    } catch (error) {
        return res.status(401).send("Unable to authenticate");
    }
    try {
        let chats = chatService.getUserChats(decoded.username)
        return res.status(200).send(chats)
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

const postChat = async (req, res) => {
    let decoded
    try {
        const words = req.body.split(' ');
        const token = words[1];
        decoded = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up');        
    } catch (error) {
        return res.status(401).send("Unable to authenticate");
    }
    try {
        if (chatService. findByTwoUsers(decoded.username, req.body.username)) 
            return res.status(409).send("Chat already exists");
        chatService.createByUsername(decoded.username, req.body.username)
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

//Returns 
const getChatById = async (req, res) => {
    try {
        const words = req.body.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }

    try {
        const id = req.params.id
        if (!req.params.id) {
            return res.status(400).send("Invalid request parameters")
        }
        const existingChat = await chatService.getChatById(id)
        if (existingChat) {
            return res.status(200).send(existingChat)
        }
        return res.status(404).send("Chat not found")
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

const deleteChatById = async (req, res) => {
    try {
        const words = req.body.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }

    try {
        const id = req.params.id
        if (!req.params.id) {
            return res.status(400).send("Invalid request parameters")
        }
        if (chatService.deleteChatById(id)) {
            return res.status(200).send("Chat successfully deleted")
        }
        return res.status(404).send("Chat not found")
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

const postChatMessagesById = async (req, res) => {
    try {
        const words = req.body.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }

    
}

const getChatMessagesById = async (req, res) => {
    try {
        const words = req.body.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }


}
module.exports = { getChats, postChat, getChatById, deleteChatById, postChatMessagesById, getChatMessagesById } 