const Pict = require('../database/models/pict.model')

exports.addPict = async (id) => {
    try {
        let pict = await Pict.findOne({ id: id })
        if (pict) {
            pict.weight++
            await Pict.findOneAndUpdate({ id: id }, pict)
        } else {
            pict = new Pict({ id: id })
            await pict.save()
        }
        return pict
    } catch (e) {
        throw e
    }
}

exports.getAllPict = async () => {
    try {
        const picts = await Pict.find({})
        return picts
    } catch (e) {
        throw e
    }
}
