const Message = require('../database/models/message.model')

/**
 * Save a new message
 * @param {string} content
 * @param {string} ip
 */
exports.createMessage = async (content, ip) => {
    try {
        let message = new Message({ content, ip })
        message = await message.save()
        return message
    } catch (e) {
        throw e
    }
}
