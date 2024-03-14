const express = require('express')
const router = express.Router()
const { messageCreate } = require('../controller/message.controller')

router.route('/').post(messageCreate)

module.exports = router
