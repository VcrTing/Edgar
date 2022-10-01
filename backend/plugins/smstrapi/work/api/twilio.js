const Client = require('twilio')

const factory = (SID, TOKEN, SENDER) => Client(SID, TOKEN)

const ser_result = function(rec) {
    let status = false
    if (rec) { if (rec.sid) status = true }
    return { send_status: true, is_fail: !status }
}

const send = async function(client, body, to, from) {
    to = to.startsWith('+') ? to : ('+' + to)
    return await client.messages.create({ body, from, to })
}

module.exports = {
    ser_result,
    factory,
    send
}