
const util = require('../../utils/util')

const outdate = function(tim) {
    // 判断是否超出现在
    const can = util.time_cont_now(tim)
    if (can) {
        return tim
    } else {
        // 未超出则 冒泡到 明年的这个时间
        let res = util.split_time(tim)
        res = res ? res[0] : new Date().getFullYear()
        res = Number.parseInt(res)
        return util.rep_year(tim, res + 1)
    }
}

module.exports = {
    outdate
}