
const db_snd = 'send'
const db_rmd = 'remind'

// 修改 Remind 结果
const updRemind = async function(id, rmd) {
    return await strapi.query(db_rmd).update({ id }, rmd)
}

// 修改 Remind 结果，因为 Remind 序列化完成了
const updRemind_Serial = async function(rmd, y) {
    let src = rmd.work_year
    src = src ? src + '_' : ''
    return await updRemind(rmd.id, { work_year: src + y })
}

const updSend = async function(id, snd) {
    return await strapi.query(db_snd).update({ id }, snd)
}

// 修改 Send 结果，因为 Send 序列化完成了
const updSend_Result = async function(snd) {
    const id = snd.id 
    const data = { times: snd.times, is_serial: true, finish_first: snd.finish_first ? true : false }
    data.result = snd.result
    return await updSend(id, data)
}

module.exports = {
    updSend,
    updSend_Result,

    updRemind,
    updRemind_Serial
}