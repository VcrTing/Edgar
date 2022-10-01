

const content = require('./sci-cont')
const instant = require('../../../extensions/send_work/instant')
const smstrapi = require('../../../plugins/smstrapi/api/index')
module.exports = {
    /*
        {
            to_email: 'vcrting@163.com',
            to_note: '+852 92779625',
            email: 'vcrting@163.com',
            code: '123456',
            send_way: [ 'email', 'note' ]
        }
    */
    // 及时发送 验证码
    async send_code(ctx) {
        const _whatsapp = smstrapi.conf.KEY_WHATSAPP
        let dat = ctx.request.body
        const send_way = dat.send_way ? dat.send_way.split('_') : [ ]
        
        let res = [ ]
        send_way.map(async e => {
            if (e != _whatsapp) {
                res.push( await smstrapi.instant(
                    e, dat[ 'to_' + e ], 
                    content[e].subject(dat.code), content[e].content(dat[ 'email' ], dat.code) )
                )
            } else { // 发送验证码给 whatsapp
                await smstrapi.instant_whatsapp.send_code( dat.code, dat[ 'to_' + _whatsapp ] ) }
        })
        return res
    },
    
    // 即时发送 新增提醒
    /*
        phones: [ '85292779625' ]
        emails: [ 'vcrting@163.com' ]
        company_name: '我的公司'
    */
    async instant_remind_add(ctx) {
        let dat = ctx.request.body
        let phs = dat.phones
        phs = phs ? phs.filter(e => { if (e > 1000 || e.length >= 4) { return true } else { return false } }) : null
        const ems = dat.emails
        const name = dat.company_name
        if (phs) await instant.remind[ 'whatsapp' ]( phs, [ { v: name } ] );
        if (ems) await instant.remind[ 'email' ]( ems, name );
        return ems
    }
};
