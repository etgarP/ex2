const User = require('../models/Users');
const userService = require('../services/Users')
const Chat = require('../models/Chats').Chat
const Message = require('../models/Chats').Message

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

const findHighestMessageId = async (chat) => {
    try {
      const highestId = await chat.aggregate([
        // outputs a document for each element of an array field
        { $unwind: "$messages" }, 
        // 
        { $lookup: { from: "messages", localField: "messages", foreignField: "id", as: "message" } }, // Populate the messages
        { $unwind: "$message" }, // Unwind the message object
        { $group: { _id: null, maxId: { $max: "$message.id" } } } // Find the maximum id
      ]);
  
      if (highestId.length === 0) {
        // No messages found in the chat
        return null;
      }
  
      return highestId[0].maxId;
    } catch (error) {
      throw error;
    }
};

const postChatMessagesById = async (id, newMessage, username) => {
    try {
        let chat = await Chat.findOne({ "id": id }).populate('users').populate('messages').exec()
        const user = await User.findOne({ username });
        console.log(user._id)
        const userIds = chat.users.map(user => user._id);
        console.log(userIds[0])
        const chats = await Chat.find({ users: user._id }).populate('users');
        console.log(chat.messages)
        chat.messages.updateOne({})
        await chat.save()
        return
    } catch (error) {
        throw error
    }
}

const getNewMessage = async (id, senderId, content) => {
    try {
        const newMessage = new Message({
            id: id, // Set the id to a value greater than existing messages
            sender: senderId,
            content: content
        });
        await message.save()
        return newMessage
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
