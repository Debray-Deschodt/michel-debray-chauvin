const { addPict, getAllPict } = require('../queries/pict.queries.js')

exports.pictAdd = async (req, res, next) => {
    try {
        await addPict(req.body.id)
        res.status(200).end()
    } catch (e) {
        throw e
    }
}

exports.pictGetAll = async (req, res, next) => {
    try {
        const picts = await getAllPict()
        res.json(picts)
    } catch (e) {
        throw e
    }
}
