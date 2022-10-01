const conf = require('../../conf')
const tw_email = require('../api/email')

const twilio = require('../api/twilio')
const mailgun = require('../api/mailgun')
const whatsapp_api = require('../api/whatsapp')

const db_note = require('../data/note')
const db_email = require('../data/email')
const db_whatsapp = require('../data/whatsapp')

// 短信
const _note = async function(e, fac, sender) {
    if (e && !e.send_status && e.send_active) {
        let res = null 
        try {
            res = await twilio.send(fac, e.content, e.phoned_prefix + ' ' + e.phoned, sender)
        } catch (err) { }
        res = twilio.ser_result(res)
        db_note.update({ id: e.id, ...res }, conf.ENDPOINT.smsnote)
    }
}
const note = async function(key) {
    if (key && key.sid) {
        let res = await db_note.query( conf.ENDPOINT.smsnote )
        if (res) { 
            const fac = twilio.factory(key.sid, key.token)
            res.map(async e => _note(e, fac, key.sender)) }
    }
}

// 电邮
const _email = async function(e, fac, domain, from) {
    if (e && !e.send_status && e.send_active) {
        let res = null
        try { 
            res = await mailgun.send(fac, domain, from, [ e.to ], e.subject, e.content)
        } catch(err) { }
        res = mailgun.ser_result(res); res.id = e.id
        await db_email.update(res, conf.ENDPOINT.smsemail)
    }
}

const email = async function(key) {
    if (key && key.sender) {
        let res = await db_email.query(conf.ENDPOINT.smsemail)
        if (res) { 
            const fac = mailgun.factory(key.sid, key.token)
            res.map(async e => await _email(e, fac, key.sender, key.sid)) }
    }
}

// 手机应用提示
const _whatsapp = async function(e, token, uri) {
    if (e && !e.send_status && e.send_active) {
        let res = await whatsapp_api.send(uri, {
            name: e.name, components: [ { type: 'body', parameters: e.parameters_body } ],
            recipient: whatsapp_api.buiid_phone(e.phoned, e.phoned_prefix)
        }, token)
        res = db_whatsapp.buiid_resuit(res); res.id = e.id
        await db_whatsapp.update(res, conf.ENDPOINT.smswhatsapp)
    }
}
const whatsapp = async function(key) {
    if (key && key.sid) {
        let res = await db_whatsapp.query(conf.ENDPOINT.smswhatsapp)
        if (res) { 
            const token = await whatsapp_api.token(key.sid, key.token, key.mark)
            res.map(async e => await _whatsapp(e, token, key.mark)) }
    }
}

module.exports = {
    note,
    email,
    whatsapp
}