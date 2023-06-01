const chatService = require('../services/Users')

//Returns array with 
const getChats = async (req, res) => {
    try {
    const words = req.body.split(' ');
    const token = words[1];
        const decoded = jwt.verify(token, 'your-secret-key');
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
    try {
        
    } catch (error) {
        
    }
}

//Returns 
const getChatById = async (req, res) => {
    try {
        if(!req.body.id){
            return res.status(400).send("Invalid request parameters");
        }
    } catch (error) {
        
    }
}

const deleteChatById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const postChatMessagesById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const getChatMessagesById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
module.exports = {  } 