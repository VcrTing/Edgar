const db_rmd = 'remind'
const db_snd = 'send'

// send type = -1: 只有首发
// send type = 0: 首发且包含定时
// send type = 1: 只包含定时
// 获取能够 序列化的 Remind
const getRemind = async function (year) {
    let res = await strapi.query(db_rmd).find({ 
        _limit: 30, 
        is_stop: false, 
        send_typed_gt: -1,
        work_year_ncontains: year 
    }, null)
    return res ? res : [ ]
}    
const getRemind_First = async function () {
    let res = await strapi.query(db_rmd).find({ 
        _limit: 30, 
        is_stop: false, 
        send_typed_lt: 1,
        send_typed_finish: false,
    }, null)
    return res ? res : [ ]
}    

// 获取当前能够 序列化的 Send
const getSend = async function(y) {
    let res = await strapi.query(db_snd).find({ 
        _limit: 30,
        work_year: y,
        is_first: false,
        is_serial: false,
        send_active: true,
    }, null)
    return res ? res : [ ]
}

// 获取首发的 Send
const getSend_First = async function() {
    let res = await strapi.query(db_snd).find({ 
        _limit: 30,
        is_first: true,
        is_serial: false,
        send_active: true,
        finish_first: false,
    }, null)
    return res ? res : [ ]
}

module.exports = {
    getSend,
    getRemind,
    getSend_First,
    getRemind_First
}