const conf = require('../../conf')


const _insert_note = async function(MODEL, data) {
    data.is_fail = false
    data.send_active = true
    data.send_status = false
    return await strapi.entityService.create( { data }, { model: MODEL } ) 
}

// 查重复，不重复，返回 True
const _fetch_items = async function(MODEL, params) {
    let res = await strapi.entityService.find( { params }, { model: MODEL } ) 
    return res && res.length > 0 ? res : null
}

const diff = async function(MODEL, param) {
    let res = await _fetch_items(MODEL, param)
    return !(res && res.length > 0)
}

// 构建 whatsapp 的 parameters_body

const _buiid_parameters_body = function(params) {
    let res = [ ]
    // 分割线 三下划线
    params = params ? params.split('___') : []
    if (params) {
        // 0. company name
        // 1. filling timed
        params.map(e => { res.push({ type: 'text', text: e }) })
    }
    return res
}
module.exports = {
    whatsapp: async function(send_day, phoned, name, conts, mark, unique = null) {
        let can = true
        if (unique) {
            can = await diff(conf.ENDPOINT.smswhatsapp, { send_day, phoned, mark })
        }
        if (can && phoned) {
            const params = { send_day, name, phoned, mark, parameters_body: _buiid_parameters_body(conts)}
            return await _insert_note(conf.ENDPOINT.smswhatsapp, params)
        }
    },
    
    note: async function(send_day, phoned, phoned_prefix, content, mark, unique = null) {
        let can = true
        if (unique) {
            can = await diff(conf.ENDPOINT.smsnote, { send_day, phoned, mark })
        }
        
        if (can && phoned) {
            const params = { send_day, content, phoned, phoned_prefix, mark }
            return await _insert_note(conf.ENDPOINT.smsnote, params)
        }
    },
    email: async function(send_day, to, subject, content, mark, unique = null) {
        let can = true
        if (unique) {
            can = await diff(conf.ENDPOINT.smsemail, { send_day, to, mark })
        }

        if (can && to) {
            const params = { send_day, to, subject, content, mark }
            return await _insert_note(conf.ENDPOINT.smsemail, params)
        }
    },
}