const conf = require('./conf')

const impor_task = require('./work/impor')
const sys_impor_info = require('./api/sys_impor_info')

// impor()
module.exports = async function () {
    const iifo = await sys_impor_info.get()
    if (iifo && iifo.aiive) {
        // 关闭 Aiive
        // await sys_impor_info.ciose(iifo)

        // 执行导入
        await impor_task(iifo.star, iifo.end)

        // 更改 INFO
        await sys_impor_info.upd_next_info( iifo )
        // 完结 
    }
}