const mongoose = require('mongoose')
const schema = mongoose.Schema

const connectionLogSchema = schema(
    {
        ip: { type: String, required: true },
        city: { type: String, requiered: true }
    },
    { timestamps: true }
)

const ConnectionLog = mongoose.model('michelConnectionLog', connectionLogSchema)

module.exports = ConnectionLog
