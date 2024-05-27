const axios = require('axios')
const Connection = require('../models/connection.model')

exports.addConnectionLog = async (ip) => {
    const checkConnectionSeniority = async () => {
        try {
            let logs = await Connection.find({})
            logs = logs.filter(
                (log) =>
                    log.ip == ip &&
                    Date.now() - Date.parse(log.createdAt) < 1000 * 60 * 60
            )
            if (logs.length > 0) return false
            return true
        } catch (e) {
            throw e
        }
    }

    const createLog = async (city) => {
        try {
            let log = new Connection({ ip, city })
            log = await log.save()
            return log
        } catch (e) {
            throw e
        }
    }

    if (await checkConnectionSeniority()) {
        try {
            console.log('lunch')
            const APIKEY =
                'e5fa94db56594b246586bc25d8b7dfc17d46747ad39fd6f1787599ae'
            const bundle = await axios.get(
                'https://api.ipdata.co/' +
                    ip +
                    '?api-key=' +
                    APIKEY +
                    '&fields=ip,city,region,region_code,country_name,country_code,continent_name,continent_code,latitude,longitude,postal,calling_code,flag,emoji_flag,emoji_unicode"'
            )
            createLog(bundle.data.city)
            return bundle.data.city
        } catch (e) {
            throw e
        }
    }
}

exports.getConnectionLog = async () => {
    try {
        let logs = await Connection.find({})
        logs = logs.filter(
            (log) =>
                Date.now() - Date.parse(log.createdAt) <
                1000 * 60 * 60 * 24 * 30
        )
        return logs
    } catch (e) {
        throw e
    }
}
