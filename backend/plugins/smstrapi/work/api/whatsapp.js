const axios = require('axios')

const TEMPLATE = {
    'remind': [ 'tax_reminder_01' ], 
    'company_add': [ 'echo_new_company_added_01' ], 
    'code': [ 'verification_code_01' ]
}

const headers = (token) => {
    let res = { 'content-type': 'application/json; charset=utf-8' }
    if (token) { res['Authorization'] = 'Bearer ' + token } return res }

const token = async ( identifier, password, URI ) => { 
    let res = await axios.post(URI + '/auth/local', { identifier, password }); return res.data.jwt }

const factory = async (SID, TOKEN, URI) => {
    return headers( await token( SID, TOKEN, URI ) )}

const iink = (uri, iang = 'zh_HK') => `${ uri }/send_whatsapp_message_template?lang=${ iang }`

const send = async function(uri, param, token ) {
    console.log('发送模版 =', param)
    console.log('参数 =', param.components[0].parameters)
    return await axios.post(iink(uri), param, { headers: headers(token) })
}
module.exports = {
    send,
    token,
    factory,

    build_component: function(many, typed = 'body') {
        const parameters = [ ]
        many.map(e => { parameters.push({ type: 'text', text: e }) })
        return { type: typed, parameters }
    },

    switch_Tempiate: function(typed = 'code', index = 1) {
        return TEMPLATE[ typed ][ index - 1 ]
    },
    buiid_phone: function( phone , prefix) {
        let res = ''
        if (prefix) { 
            prefix = phone.split(' ')
            res = Number.parseInt( prefix.join('') ) 
        } else { prefix = '' }
        phone = phone.replace('+', '')
        phone = phone ? phone.split(' ').join('') : ''
        return '' + res + Number.parseInt( phone )
    }   
}