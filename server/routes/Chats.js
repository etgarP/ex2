const ChatsController = require("../controllers/Chats")

const express = require('express')
var router = express.Router()

router.route('/').get(ChatsController.getChat)
router.route('/').post(ChatsController.postChat)
router.route('/:id').get(ChatsController.getChatById)
router.route('/:id').delete(ChatsController.deleteChatById)
router.route('/:id/Messages').post(ChatsController.postChatMessagesById)
router.route('/:id/Messages').get(ChatsController.getChatMessagesById)

module.exports = router