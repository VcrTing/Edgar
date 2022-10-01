
const get = require('../utils/get')
const util = require('../utils/util')

const upd = require('../utils/upd')
const save = require('../utils/save')
const func = require('./_func')
const content = require('./inner/fetch_content')
const smstrapi = require('../../../plugins/smstrapi/api/index')

/*
    提醒
*/
// 新建首发 Send
const _plus_send = function(rmd) {
    let snd = {
        is_first: true, finish_first: false,
        work_year: 0, remind: rmd.id, is_serial: false,
        user: rmd.company.user, company: rmd.company.id,
    }
    snd.times = [{
        day_sending: util._now(), conts: content.get_first(smstrapi.conf.WAY),
        emails: rmd.company.emails, phones: rmd.company.phones,
    }]
    return snd
}
// 序列化 提醒
const _do_remind = async function(rmd) {
    // 生成 SEND
    let snd = _plus_send(rmd)
    snd = await save.saveSend(snd)
    // 修改 REMIND
    await upd.updRemind(rmd.id, { id: rmd.id, send_typed_finish: true })
}

/*
    发送
*/
const _do_send = async function(snds) {
    // 生成 STRAPI
    await snds.map(async e => { 
        // 解析 Way
        let way = e.remind.send_way_world
        way = way ? way.split('_') : [ ]
        try { // 序列化 Send，生成发送
            e = await func._ser_send( e, way ) 
        } catch( err ) { }
        // 修改 结果
        e.finish_first = true
        await upd.updSend_Result(e)
    })
}

module.exports = async function() {

    // 操作 remind
    try {
        let reminds = await get.getRemind_First()
        reminds.map(e => _do_remind(e)) 
    } catch (err) { }

    // 操作 send
    try {
        let sends = await get.getSend_First()
        await _do_send(sends)
    } catch (err) { }
}