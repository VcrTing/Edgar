const _db = 'company-origin'

module.exports = {
    get: async function ( pas ) {
        return await strapi.query(_db).find(pas, null )
    },
    upd: async function (dat, id) {
        return await strapi.query(_db).update({ id }, dat)
    },

    same: async function (tax_id) {
        const res = await strapi.query(_db).find( { tax_id }, null )
        return res && res.length > 0
    },

    create: async function (dat) {
        const res = await strapi.query(_db).create( dat )
        if (res) { return dat } else { return null }
    }
}