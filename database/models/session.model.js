const mongoose = require('mongoose')
const schema = mongoose.Schema

const sessionSchema = schema({
    _id: { type: String, required: true },
    session: { type: String, required: true }
})

const Session = mongoose.model('session', sessionSchema)

module.exports = Session
