'use strict';
/*
const sms_work = require('../../extensions/send_work/index')
const running = require('../../plugins/smstrapi/work')
const cp_ref = require('../../extensions/company_refresh')
const air_impor = require('../../extensions/air_impor')
*/
const m = require('moment')
const st = m( new Date() )

module.exports = {
  '1 * * * * *': () => {
    // running()
    // sms_work()
    // cp_ref.running()
    // air_impor()
  },

  '1 */5 * * * *': () => {
    air_impor()
    // console.log('2分钟一次， m', (m(new Date()) - st)/3600)
  }
};
