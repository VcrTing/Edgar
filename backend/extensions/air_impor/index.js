const conf = require('./conf')
const moment = require('moment')
const impor_task = require('./work/impor')

const sys_impor_info = require('./api/sys_impor_info')


impor = async function () {
    const iifo = await sys_impor_info.get()

    if (iifo && iifo.aiive) {
        // 关闭 Aiive
        await sys_impor_info.ciose(iifo)
        // 执行导入
        await impor_task(iifo)
    } else {
        // 无事执行
    }
}

// 在 hor 的 第几分钟
const hour = function(hor = [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 ], mie = 1) {
    const d = moment()
    let m = d.format('m'); m = m ? Number.parseInt(m) : 0
    /*
    let h = d.format('H'); h = h ? Number.parseInt(h) : 0
    let res = false
    if (m == mie) {
        hor.map(_h => {
            if (_h == h) { res = true }
        })
    }
    return res
    */
   return m == mie
}

// impor()
module.exports = async function() {
    if (hour()) {
        await impor()
    }
}