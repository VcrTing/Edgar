const TASK_LIMIT = 20

const ENDPOINT = {
    key: 'plugins::smstrapi.key',
    smsnote: 'plugins::smstrapi.sms-note',
    smsemail: 'plugins::smstrapi.sms-email',
    smswhatsapp: 'plugins::smstrapi.sms-whatsapp'
}

const KEY_NOTE = 'note'
const KEY_EMAIL = 'email'
const KEY_WHATSAPP = 'whatsapp'
const WAY = [ KEY_NOTE, KEY_EMAIL, KEY_WHATSAPP ]

module.exports = {
    WAY,
    ENDPOINT,
    TASK_LIMIT,

    KEY_NOTE,
    KEY_EMAIL,
    KEY_WHATSAPP,

    COMPANY_EMAIL: 'info@EdgarEmma.com'
}