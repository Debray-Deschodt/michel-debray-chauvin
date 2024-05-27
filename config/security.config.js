const {
    addConnectionLog
} = require('../database/geolocalisationLogs/geolocalisationLogs')

exports.ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        try {
            console.log(await addConnectionLog(req.ip))
        } catch (e) {
            throw e
        }
        res.status(403).end()
    }
}
