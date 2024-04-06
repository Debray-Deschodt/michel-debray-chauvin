const { createUser } = require('../queries/user.queries')

exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body
        const user = await createUser(body)
        res.end()
    } catch (e) {
        console.error(e)
        res.json({ error: "Il y a déjà quelqu'un qui s'appelle comme toi" })
    }
}
