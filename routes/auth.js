const express = require('express')
const router = express.Router()
const { sessionNew } = require('../controller/auth.controller')
const { ensureAuthenticated } = require('../config/security.config')

router.route('/').get(ensureAuthenticated, sessionNew)

module.exports = router
