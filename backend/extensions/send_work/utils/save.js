
const db_send = 'send'

// 保存 Send，拒绝重复
const saveSend = async function(src) {
    let send = await strapi.query(db_send).find({ 
        remind: src.remind, work_year: src.work_year, send_active: true 
    }, null )
    if (send && send.length > 0) {
        return null
    } else {
        src.is_serial = false
        src.send_active = true
        return await strapi.query(db_send).create( src )
    }
}

module.exports = {
    saveSend
}