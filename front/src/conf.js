
const TEST = true

const baseURL = 'https://strapi07.svr.up5d.com'
// const baseURL = 'http://127.0.0.1:1337'

const API = baseURL // + '/api'

const VERSION = '1.13'
const VERSION_TIMED = '2022-08-15'

const ENDPOINT = {
  user: '/users',
  send: '/sends',
  remind: '/reminds',
  company: '/companies',
  import_record: '/import-records',
  company_origin: '/company-origins',
  company_origin_count: '/company-origins/count',
  company_search: '/companies_search',

  trash_sms: '/sends/trash/way',

  sms_code: '/send-codes/code/send',
  sms_instant_add: '/send-instant/remind/add'
}

const STRAPI = {
  named: 'strapi-admin@gmail.com',
  pass: '1Qazxc2Wsxcv'
}

export default {
  baseURL,
  API,

  TEST,
  TEST_LOCAL: baseURL.endsWith('1:1337'),
  
  STRAPI,
  ENDPOINT,

  VERSION,
  VERSION_TIMED
}
// cp ~/SAVE/EdgarEmma/backend/Edgear/extensions/send_work/save/msg.js
// cp ~/SAVE/EdgarEmma/backend/Edgear/plugins/smstrapi/