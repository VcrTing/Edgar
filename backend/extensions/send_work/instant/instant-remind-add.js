
const msg = require('../save/msg')


const smstrapi = require('../../../plugins/smstrapi/api/index')
const wash = require('../work/inner/fetch_content')
const whatsapp = smstrapi.api.whatsapp

// 限定了某模版
const email_conts =  msg.email[1]
module.exports = {
    email: async (ems, name) => {
        // ems: [ 0000, 0000 ]
        // name: 'xxxx'
        const subs = [ ]
        const conts = [ ]
        ems.map( email => {
            subs.push( email_conts.subject )
            conts.push( wash.wash_content(email_conts.content, { name, email }) )
        })
        // 多人，发多个 模版
        await smstrapi.one_off_send.email(ems, subs, conts)
    },
    whatsapp: async (phs, params) => {
        // phs: [ 0000, 0000 ]
        // params: [ 'xxxx', 'xxxx ]
        const tempiate = whatsapp.switch_Tempiate('company_add', 1)
        const compoents = [ whatsapp.build_component( params.map(e => e.v) ) ]
        // 多人 发一个 模版
        await smstrapi.one_off_send.whatsapp( phs, tempiate, compoents )
    },
}