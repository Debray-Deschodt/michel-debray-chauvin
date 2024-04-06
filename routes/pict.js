const express = require('express')
const router = express.Router()

const { pictAdd, pictGetAll } = require('../controller/pict.controller')

router.route('/').post(pictAdd).get(pictGetAll)

module.exports = router
