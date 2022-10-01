
const moment = require('moment')

// 减出时间，通过 天
const time_num = function(src, num) {
    src = src ? src : new Date()
    return src ? moment(src).add(num, 'd').format('yyyy-MM-DD') : null
}

const _contrast = function(n, o) { return moment(n).diff(o)}

// 对比时间, n > o 则 true
const time_contrast = function(n, o) {
    return _contrast(n, o) > 0
}
// 对比时间相等
const time_equal = function(n, o = new Date()) {
    o = moment(o).format('yyyy-MM-DD')
    n = moment(n).format('yyyy-MM-DD')
    return _contrast(n, o) == 0
} 

// 对比时间 >= 
const time_cont_now = function(n, o = new Date()) {
    o = moment(o).format('yyyy-MM-DD')
    n = moment(n).format('yyyy-MM-DD')
    return _contrast(n, o) >= 0
}

// 取出某时间的 年 月 日 
const split_time = function(src) {
    src = moment(src)
    return [src.year(), src.month(), src.day()]
}

// 给某时间 替换 年
const rep_year = function(src, _y) {
    src = moment(src)
    src.set('year', _y)
    return src.format('yyyy-MM-DD')
}

// 获取今天
const _now = function() {
    return moment(new Date()).format('yyyy-MM-DD')
}

module.exports = {
    _now,
    rep_year,
    split_time,

    time_num,
    time_equal,
    time_contrast,
    time_cont_now
}