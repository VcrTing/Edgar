const moment = require('moment')

const now = () => moment(new Date()).format('yyyy-MM-DD')

module.exports = {
    now
}