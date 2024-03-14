const { createMessage } = require('../queries/message.queries.js')

/**
 * Create a new message
 * @body {string} message
 */
exports.messageCreate = async (req, res, next) => {
    try {
        console.log(req.body.message, typeof req.ip)
        await createMessage(req.body.message, req.ip)
        res.status(200).end()
    } catch (e) {
        throw e
    }
}
