const _db = 'company-origin'

module.exports = {
    get: async ( pas ) => {
        console.log('GET')
        return await strapi.query(_db).find(pas, null )
    },
    upd: async (dat, id) => {
        console.log('UPDATE')
        return await strapi.query(_db).update({ id }, dat)
    },

    same: async (tax_id) => {
        const res = await strapi.query(_db).find( { tax_id }, null )
        return res && res.length > 0
    },

    create: async (dat) => {
        const res = await strapi.query(_db).create( dat )
        if (res) { return dat } else { return null }
    }
}