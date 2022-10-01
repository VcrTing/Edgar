const conf = require('../../conf')

const _ser = function(res) {
    res = res ? res[0] : null
    return res ? { mark: res.mark, sid: res.key, token: res.token + res.token_suffix, sender: res.sender } : { }
}

const _fetching = async (key_type) => _ser( await strapi.entityService.find( { params: { key_type , status: true }}, { model: conf.ENDPOINT.key } ) )

module.exports = {
    note: _fetching,
    email: _fetching,
    whatsapp: _fetching
}