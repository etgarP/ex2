const Chat = require('../models/Chats')

const getChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).exec()
        return chat
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

module.exports = { getChatById, }