const conf = require('../conf')

const api = require('../work/api/_api')

const insert = require('./db/insert')
const trash = require('./option/trash')

const instant = require('./instant/instant')
const instant_whatsapp = require('./instant/instant-whatsapp')

const one_off_send = require('./one_off_send/one_off_send')

module.exports = {
    api,

    conf,
    // typed 传入 note / email / whatsapp
    // user 数据固定，格式为：{ to_prefix: '852/null', to: '92779625/xxx@email.com', from: 'null/xxx@email.com' }
    // conts 数据固定，格式为：{ subject: 'null/这是一封邮件', content: '短信内容/邮件HTML内容' }
    trash,
    insert,

    instant,
    instant_whatsapp,

    one_off_send
}