const Chat = require('../models/Chats')
const userService = require('../services/Users')

id = 1

const getChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).exec()
        return chat
    } catch (error) {
        throw error
    }
};

const findByTwoUsers = async (user1, user2) => {
    try {
        const chats = await Chat.find({ "username": user1 }).exec()
        if (!chats) return false
        for (let chat in chats) {
            const otherUser = chat.users.find((user) => user.username == user2);
            if(otherUser != null) return true
        }
        return false
    } catch (error) {
        throw error
    }
}

const createByUsername = async (myUser, otherUser) => {
    try {
        const chat = new Chat({
            id: id,
            users: [userService.getUser(myUser), userService.getUser(otherUser)],
            messages: []
        })
        await chat.save()
        id++
        return
    } catch (error) {
        throw error
    }
}

const deleteChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).exec()
        if (!chat) {
            return false
        }
        await Chat.deleteOne({ "id": id }).exec()
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

module.exports = { getChatById, deleteChatById, getUserChats, createByUsername, findByTwoUsers }
