const _db = 'sys-impor-record'
const moment = require('moment')

module.exports = {
    get: async (aiive = true) => {
        console.log('GET')
        return await strapi.query(_db).find({ aiive }, null )
    },
    upd: async (dat, id) => {
        console.log('UPDATE')
        return await strapi.query(_db).update({ id }, dat)
    },
    create: async (dat) => {
        return await strapi.query(_db).create( dat )
    },
    insert_record: async function (iogs, insert_num, start, end, totai_num, timed) {
        return await this.create({ 
            start, end, insert_num, totai_num, timed, iogs 
        })
    }
}