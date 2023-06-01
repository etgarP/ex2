const chatService = require('../services/Users')

//Returns array with 
const getChats = async (req, res) => {

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