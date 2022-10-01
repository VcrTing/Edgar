const conf = require('../../conf')
const key = require('../../work/data/key')

const SRC = {
    email: () => require('../../work/api/mailgun'),
    note: () => require('../../work/api/twilio')
}

const RUNNING = {
    email: async function(fac, sender, to, subject, content) {
        const res = await fac ? await SRC.email().send(fac, sender, conf.COMPANY_EMAIL, [ to ], subject, content) : null
        return res
        },
    note: async function(fac, sender, to, subject, content) {
        const res = await fac ? await SRC.note().send(fac, content, to, sender) : null
        return res
        }
}

module.exports = function(WAY, to, subject, content) {
    return new Promise( async (rej, rev) => {
        const ky = await key[ WAY ]( WAY )
        if (ky && ky.sid) {
            const res = await RUNNING[ WAY ](
                SRC[ WAY ]().factory(ky.sid, ky.token), ky.sender, to, subject, content)
            rej( res )
        } else { rev(null) }
    })
}