const mongoose = require('mongoose')
const schema = mongoose.Schema

const pictSchema = schema(
    {
        id: { type: Number, required: true },
        weight: { type: Number, default: 1 }
    },
    { timestamps: true }
)

const Pict = mongoose.model('michelPict', pictSchema)

module.exports = Pict
