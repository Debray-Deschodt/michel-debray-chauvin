const { addPict, getAllPict } = require('../queries/pict.queries.js')
const {
    getConnectionLog
} = require('../database/geolocalisationLogs/geolocalisationLogs')

exports.getLogs = async (req, res, next) => {
    try {
        let logs = await getConnectionLog()
        res.json(logs)
    } catch (e) {
        throw e
    }
}
