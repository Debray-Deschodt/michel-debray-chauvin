const express = require('express')
const router = express.Router()
const path = require('path')
const contact = require('./contact')
const login = require('./login')
const users = require('./users')
const auth = require('./auth')
const pict = require('./pict')
const connection = require('./connection')

router.use('/pict', pict)
router.use('/connection', connection)
router.use('/contact', contact)
router.use('/login', login)
router.use('/auth', auth)
router.use('/users', users)

router.use('/', async (req, res) => {
    switch (req.hostname) {
        case 'localhost':
            res.sendFile(
                path.join(
                    __dirname,
                    '../build/michel-debray-chauvin/client-build/index.html'
                )
            )
            break
        case 'michel-debray-chauvin.com':
            res.sendFile(
                path.join(
                    __dirname,
                    '../build/michel-debray-chauvin/client-build/index.html'
                )
            )
            break
        case 'www.michel-debray-chauvin.com':
            res.sendFile(
                path.join(
                    __dirname,
                    '../build/michel-debray-chauvin/client-build/index.html'
                )
            )
            break
        case 'krasky.io':
            res.sendFile(
                path.join(__dirname, '../build/krasky/client-build/index.html')
            )
        case 'www.krasky.io':
            res.sendFile(
                path.join(__dirname, '../build/krasky/client-build/index.html')
            )
    }
})

module.exports = router
