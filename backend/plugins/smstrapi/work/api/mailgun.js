const Mailgun = require('mailgun.js')
const FormData = require('form-data')

const URI = 'https://api.mailgun.net/'

const factory = (DOM, KEY, SENDER) => new Mailgun(FormData).client({
    username: DOM, key: KEY,
})

const ser_result = function(src) {
    return { send_status: true, is_fail: (src.status > 199) ? false : true }
}

const send = async function(client, DOM, from, to, subject, html) {
    return await client.messages.create(DOM, { from, to, subject, html })
}

module.exports = {
    ser_result,
    factory,
    send
}