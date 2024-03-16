const express = require('express')
const router = express.Router()
const path = require('path')
const contact = require('./contact')

router.use('/contact', contact)
router.use('/', (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, '../client-build/index.html'))
})

module.exports = router
