
const conf = require('../../conf')

const _trash = async function(MODEL, id) {
    await strapi.entityService.delete( { params: { id } }, { model: MODEL } );
}

module.exports = {
    note: async function(ids) {
        const MODEL = conf.ENDPOINT.smsnote
        if (ids instanceof Array) { ids.map(async id => await _trash(MODEL, id)) } else{ await _trash(MODEL, ids) }
    },
    email: async function(ids) {
        const MODEL = conf.ENDPOINT.smsemail
        if (ids instanceof Array) { ids.map(async id => await _trash(MODEL, id)) } else{ await _trash(MODEL, ids) }
    },
    whatsapp: async function(ids) {
        const MODEL = conf.ENDPOINT.smswhatsapp
        if (ids instanceof Array) { ids.map(async id => await _trash(MODEL, id)) } else{ await _trash(MODEL, ids) }
    },
}