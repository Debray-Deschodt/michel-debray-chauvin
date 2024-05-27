const express = require('express')
const router = express.Router()

const { getLogs } = require('../controller/connection.controller')

router.route('/').get(getLogs)

module.exports = router
