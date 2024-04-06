const express = require('express')
const router = express.Router()
const {
    sessionCreate,
    getLoginView
} = require('../controller/login.controller')

router.route('/').post(sessionCreate).get(getLoginView)

module.exports = router
