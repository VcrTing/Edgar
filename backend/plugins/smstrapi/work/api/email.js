

const _send = async function(to, from, subject, html) {
    return await strapi.plugins['email'].services.email.send({
        to, from, cc: to, bcc: to, replyTo: from, subject, text: '', html
    })
}

const send = async function(to, from, sub, html) {
    return await _send(to, from, sub, html)
}

module.exports = {
    send
}