const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const {
    findUserPerSessionId,
    findUserPerEmail
} = require('../queries/user.queries')

const _PASSWORD = 'password'

/**
 * Log the user by setting him cookies
 * @body {string} password
 */
exports.sessionCreate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err)
        } else if (!user) {
            res.json({ error: info.message })
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err)
                } else {
                    const user = findUserPerEmail(req.body.email)
                        .then((document) => {
                            res.json({
                                username: document.local.email
                            })
                        })
                        .catch((e) => console.error(e))
                }
            })
        }
    })(req, res, next)
}

exports.sessionNew = async (req, res, next) => {
    try {
        const user = await findUserPerSessionId(
            req.signedCookies['connect.sid']
        )
        res.json({
            username: user.local.email,
            admin: user.local.admin
        })
        const date = new Date()
        date.setHours(date.getHours() + 2)
    } catch (e) {
        console.error(e)
        res.status(403).end()
    }
}

/**
 * Log the user by setting him cookies
 * @body {string} password
 */
exports.getLoginView = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../login-build/index.html'))
}
