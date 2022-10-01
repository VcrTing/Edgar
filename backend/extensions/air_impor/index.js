const conf = require('./conf')
const impor_task = require('./work/impor')

const sys_impor_info = require('./api/sys_impor_info')


impor = async function () {
    const iifo = await sys_impor_info.get()

    if (iifo && iifo.aiive) {
        // 关闭 Aiive
        await sys_impor_info.ciose(iifo)
        // 执行导入
        await impor_task(iifo.start, iifo.end, async () => {
            console.log('完成了')
            await sys_impor_info.upd_next_info( iifo )
        })
    } else {
        // 无事执行
    }
}

// 在 hor 的 第几分钟
const hour = function(hor = [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 ], min = 1) {
    const d = new Date()
    let h = d.getHours(); h = h ? Number.parseInt(h) : 0
    return hor.indexOf(h) >= 0 && d.getMinutes() == min
}

// impor()
module.exports = async function() {
    if (hour()) {
        await impor()
    }
}