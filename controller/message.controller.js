const { createMessage } = require('../queries/message.queries.js')

/**
 * Create a new message
 * @body {string} message
 */
exports.messageCreate = async (req, res, next) => {
    try {
        await createMessage(req.body.message, req.ip)
        res.status(200).end()
    } catch (e) {
        throw e
    }
}
