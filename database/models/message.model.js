const mongoose = require('mongoose')
const schema = mongoose.Schema

const messageSchema = schema(
    {
        content: { type: String, default: '' },
        ip: { type: String, required: true }
    },
    { timestamps: true }
)

const Message = mongoose.model('michelMessage', messageSchema)

module.exports = Message
