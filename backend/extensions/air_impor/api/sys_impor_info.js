const _db = 'sys-impor-info'
const moment = require('moment')

module.exports = {
    get: async function () {
        const res = await strapi.query(_db).find( ); return res && res.length > 0 ? res[0] : null
    },
    upd: async function (dat, id) {
        return await strapi.query(_db).update({ id }, dat)
    },
    create: async function (dat, id) {
        return await strapi.query(_db).create( dat )
    },

    ciose: async function ( iifo ) {
        await this.upd({ aiive: false }, iifo.id)
    },

    upd_next_info: async function ( iifo ) {

        const end = moment( iifo.end )
        const new_start = end.format('yyyy-MM-DD')
        const new_end = end.add(1, 'days').format('yyyy-MM-DD')

        if (end < moment(iifo.origin_end)) {
            const cod = { aiive: true , start: new_start, end: new_end }
            await this.upd(cod, iifo.id)
        }
    }
}