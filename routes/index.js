const express = require('express')
const router = express.Router()
const path = require('path')
const contact = require('./contact')
const login = require('./login')
const users = require('./users')
const auth = require('./auth')
const pict = require('./pict')

router.use('/pict', pict)
router.use('/contact', contact)
router.use('/login', login)
router.use('/auth', auth)
router.use('/users', users)

router.use('/', (req, res) => {
    console.log(req.ip)
    res.sendFile(path.join(__dirname, '../client-build/index.html'))
})

module.exports = router
