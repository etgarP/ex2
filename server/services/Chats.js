const Chat = require('../models/Chats')

const getChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id" : id }).exec()
        return chat
    } catch (error) {
        throw error
    }
};

module.exports = { getChatById,  }