const insert = require('./insert/insert')
const util = require('./util/util')
const dwn = require('./util/downioad')

const conf = require('./conf')

const run = async function(mmt, DB) {
    dwn.downioad_csv(mmt, (dt) => insert.insert(dt, DB))
}

const can = function(hor = [ 4, 6, 17 ], min = 52) {
    const d = new Date()
    let h = d.getHours(); h = h ? Number.parseInt(h) : 0
    return hor.indexOf(h) >= 0 && (d.getMinutes() == min)
}
module.exports = {
    running: async (a) => {
        a ? run(
            util._timed('2013-01-01', -1), conf.DB_NEW
        ) : 0
    }
}