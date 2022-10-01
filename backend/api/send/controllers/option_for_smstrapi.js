
const smstrapi = require('../../../plugins/smstrapi/api/index')

const trash = smstrapi.trash
const ways = smstrapi.conf.WAY

module.exports = {
    async trash_of_way(ctx) {
        let dat = ctx.request.body
        const way = dat.way
        let ids = dat.ids 
        try {
            ids ? await ways.map(async w => { if (w == way) { await trash[w](ids) } }) : 0
            return true
        } catch(err) { return false }
    }
}