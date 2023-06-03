const User = require('../models/Users');
const userService = require('../services/Users')
const Chat = require('../models/Chats').Chat
const Message = require('../models/Chats').Message
const Counter = require('../models/Chats').Counter

//
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

// creates a new counter for a chat and returns its id
const createCounter = async () => {
    try {
        const lastEntry = await Counter.findOne().sort({ _id: -1 }).exec();
        let id = (lastEntry ? lastEntry.id : 0) + 1 
        const counter = new Counter({
            id: id,
            messageCount: 0
        })
        await counter.save()
        return id
    } catch {
        throw error
    }
}

const createByUsername = async (myUser, otherUser) => {
    try {
        let id = await createCounter()
        const chat = await new Chat({
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
        const chat = await Chat.findOne({ id }).populate({ path: 'messages', model: 'Message', populate: { path: 'sender', model: 'User' } }).lean().exec();
        return chat.messages.reverse()
    } catch (error) {
        throw error
    }
}

const addToCounter = async (id) => {
    try {
        const counter = await Counter.findOne({ id }).exec();
        const updatedCount = counter.messageCount + 1;
        await Counter.findOneAndUpdate({ id }, { messageCount: updatedCount });
    
        return updatedCount;
      } catch (error) {
        throw error;
      }
}

const postChatMessagesById = async (id, content, username) => {
    try {
        let messageCount = await addToCounter(id)
        const user = await userService.getUser(username)
        let newMessage = await getNewMessage(messageCount, user, content)
        const chat = await Chat.findOne({ id });
        chat.messages.push(newMessage);
        await chat.save();
        return
    } catch (error) {
        throw error
    }
}

const getNewMessage = async (id, sender, content) => {
    try {
        const newMessage = new Message({
            id: id,
            sender: sender,
            content: content
        });
        await newMessage.save()
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
        chat.messages.forEach(async message => {
            let messageModel =await Message.findOne(message)
            await Message.deleteOne(messageModel)
        });
        let counter = await Counter.findOne({ id: chat.id })
        await Counter.deleteOne(counter)
        await Chat.deleteOne(chat)
        return true
    } catch (error) {
        throw error
    }
};

const getUserChats = async (username) => {
    try {
        const user = await User.findOne({ username });
        const chats = await Chat.find({ users: user._id }).populate('users').populate({ path: 'messages', model: 'Message' });

        const transformedChats = [];

        chats.forEach((chat) => {
            const otherUser = chat.users.find((user) => user.username !== username)
            if (otherUser != null) {
                let messages = chat.messages
                const keys = Object.keys(messages);
                const lastKey = keys[keys.length - 1];
                const lastMessage = messages[lastKey];

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



module.exports = { getChatById, deleteChatById, getUserChats, getChatMessagesById, postChatMessagesById, createByUsername, findByTwoUsers, getNewMessage }
