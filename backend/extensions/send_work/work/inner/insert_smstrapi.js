const smstrapi = require('../../../../plugins/smstrapi/api/index')

const _build_result = function(res, way) {
    return  {
        way,
        'smstrapi': res ? res.id : -1, 
        // , 'content': res.content, 'subject': res.subject ? res.subject : null 
        'send_day': res ? res.send_day : ''
    }
}

module.exports = {
    // to 是接收，timed 是哪天发送，cont 是信息对象类型
    note: async function(to, timed, cont, mark) {
        let res = { }
        to = to.v_origin ? to.v_origin : 0
        // to = 接收者，timed = 发送日期，cont.content = 短信内容
        if (to > 1000 || to.length > 4) {
            res = await smstrapi.insert[ 
                smstrapi.conf.KEY_NOTE ]( timed, to, '', cont.content, mark, true )
        }
        if (res && res.id) { res = _build_result(res, smstrapi.conf.KEY_NOTE); res['to'] = to; return res }
    },
    email: async function(to, timed, cont, mark) {
        to = to.v_origin ? to.v_origin : null
        // to = 接收者，timed = 发送日期，cont.content = 电邮HTML，cont.subject = 电邮标题
        let res = await smstrapi.insert[ 
            smstrapi.conf.KEY_EMAIL ](timed, to, cont.subject, cont.content, mark, true )
        if (res && res.id) { res = _build_result(res, smstrapi.conf.KEY_EMAIL); res['to'] = to; return res }
    },
    whatsapp: async function(to, timed, cont, mark) {
        let res = { }
        to = to.v_origin ? to.v_origin : 0
        // to = 接收者，timed = 发送日期，cont.content = 公司名称，cont.tempiate_name = 后台需要使用的模版名称
        if (to > 1000 || to.length > 4) {
            res = await smstrapi.insert[ 
                smstrapi.conf.KEY_WHATSAPP ](timed, to + '', cont.tempiate_name, cont.content, mark, true )
        }
        if (res && res.id) { res = _build_result(res, smstrapi.conf.KEY_WHATSAPP); res['to'] = to; return res }
    }
}