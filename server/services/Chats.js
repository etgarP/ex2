const Chat = require('../models/Chats')

const getChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).exec()
        return chat
    } catch (error) {
        throw error
    }
};

const createByUsername = async (id) => {
    try {
        const chat = new Chat({ username, displayName, profilePic })
        await chat.save()
        return 
    } catch (error) {
        throw error
    }
}

const getChatMessagesById = async (id) => {
    try {
        const messages = await Chat.findOne({ "id": id }).exec().messages
        return messages
    } catch (error) {
        throw error
    }
}

const postChatMessagesById = async (id) => {
    try {
        const words = req.body.split(' ');
        const newMessage = words[0];
        const messages = [...Chat.findOne({ "id": id }).exec().messages, newMessage]
        return messages
    } catch (error) {
        throw error
    }
}

const deleteChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).exec()
        if  (!chat)  {
            return false
        }
        await Chat.deleteOne({  "id": id  }).exec()
        return true
    } catch (error) {
        throw error
    }
};

function getBiggest(array) {
    if (array == null) return null;
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i].id > max.id) {
            max = array[i];
        }
    }
    return max
}

const getUserChats = async (username) => {
    try {
        const chats = await User.find({
            Users: { $elemMatch: { "username": username } }
        }).exec()
        const transformedChats = chats.map((chat) => {
            const otherUser = chat.users.find((user) => user.username !== username);
            const lastMessage = getBiggest(chat.messages);
            return {
                id: chat.id,
                user: otherUser,
                lastMessage: lastMessage
            };
        });
        return transformedChats
    } catch (error) {
        throw error
    }
};

module.exports = { getChatById, deleteChatById, getUserChats, getChatMessagesById, postChatMessagesById, createByUsername }
