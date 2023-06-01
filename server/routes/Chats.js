const ChatsController = require("../controllers/Chats")

const express = require('express')
var router = express.Router()

router.route('/')
    .get(ChatsController.getChat)
    .post(ChatsController.postChat)

router.route('/:id')
    .get(ChatsController.getChatById)
    .delete(ChatsController.deleteChatById)
    
router.route('/:id/Messages')
    .post(ChatsController.postChatMessagesById)
    .get(ChatsController.getChatMessagesById)

module.exports = router