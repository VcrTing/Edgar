const key = require('../../work/data/key')
const api = require('../../work/api/_api')
const conf = require('../../conf')

module.exports = {
    email: async (ems, subs, conts) => {
        const ky = await key.email(conf.KEY_EMAIL)
        if (ky && ky.sid) {
            const fac = await api.email.factory(ky.sid, ky.token)
            fac ? ems.map( async (e, i) => {
                return await api.email.send(fac, ky.sender, key.sid, [ e ], subs[ i ], conts[ i ])
            }) : [ ]
        }
    },
    
    whatsapp: async (phs, name, components) => {
        const ky = await key.whatsapp(conf.KEY_WHATSAPP)
        if (ky && ky.sid) {
            const token = await api.whatsapp.token(ky.sid, ky.token, ky.mark)
            token ? phs.map( async e => {
                return await api.whatsapp.send(ky.mark, { name, components, recipient: e }, token)
            }) : [ ]
        }
    }
}