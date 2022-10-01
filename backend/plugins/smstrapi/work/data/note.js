const conf = require('../../conf')
const utils = require('../util/util')

const query = async function(MODEL) {
    return await strapi.entityService.find( { params: { send_day_lte: utils.now(), send_status: false , send_active: true } }, { model: MODEL } ) 
}

const update = async function(data, MODEL) {
    return await strapi.entityService.update( { params: { id: data.id }, data }, { model: MODEL })
}

module.exports = {
    query,
    update
}