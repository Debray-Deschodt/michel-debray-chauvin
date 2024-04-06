const passport = require('passport')
const mongoose = require('mongoose')
const { findUserPerSessionId } = require('../queries/user.queries')

exports.sessionNew = async (req, res, next) => {
    try {
        const user = await findUserPerSessionId(
            req.signedCookies['connect.sid']
        )
        res.json({
            username: user.local.email
        })
        const date = new Date()
        date.setHours(date.getHours() + 2)
    } catch (e) {
        console.error(e)
        res.status(403).end()
    }
}

// exports.sessionNew = async (req, res, next) => {
//     try {
//         const user = await findUserPerSessionId(
//             req.signedCookies['connect.sid']
//         )
//         res.json({
//             username: user.local.email,
//             admin: user.local.admin
//         })
//         const date = new Date()
//         date.setHours(date.getHours() + 2)
//     } catch (e) {
//         console.error(e)
//         res.status(403).end()
//     }
// }
