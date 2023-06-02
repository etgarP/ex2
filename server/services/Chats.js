const User = require('../models/Users');
const userService = require('../services/Users')
const Chat = require('../models/Chats').Chat

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
        const chats = await getUserChats(user1)
        if (!chats) return false
        for (const chat of chats) {
            if (chat.user.username == user2) return true
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
            users: [await userService.getUser(myUser), await userService.getUser(otherUser)],
            messages: []
        })
        await chat.save()
        id++
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

const postChatMessagesById = async (id, newMessage) => {
    try {
        let chat = await Chat.findOne({ "id": id }).exec()
        console.log(chat.messages)
        chat.messages.updateOne({})
        await chat.save()
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
        await Chat.deleteOne({ "id": id })
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
        const user = await User.findOne({ username });
        const chats = await Chat.find({ users: user._id }).populate('users');

        const transformedChats = [];

        chats.forEach((chat) => {
            const otherUser = chat.users.find((user) => user.username !== username);
            if (otherUser != null) {
                const lastMessage = getBiggest(chat.messages);
                transformedChats.push({
                    id: chat.id,
                    user: otherUser,
                    lastMessage: lastMessage
                });
            }
        });

        return transformedChats;

    } catch (error) {
        throw error;
    }
};

module.exports = { getChatById, deleteChatById, getUserChats, getChatMessagesById, postChatMessagesById, createByUsername, findByTwoUsers }
