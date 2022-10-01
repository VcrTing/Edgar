const conf = require('../conf')

const key = require('./data/key')
const work = require('./work/work')

module.exports = () => conf.WAY.map(async e => await work[e]( await key[e](e) ))