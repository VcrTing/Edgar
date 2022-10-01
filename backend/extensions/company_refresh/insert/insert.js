
const net = require('./net')

const _cir_company = (dt) => {
    delete dt._index
    dt.company_type_txt = dt.company_type_txt.replace('"', '').replace('\"', '')
    return dt
}

const samed = async (dt, DB) => {
    const res = await net.get({ tax_id: dt.tax_id }, DB)
    return (res && res.length > 0)
}

module.exports = {
    insert: async (dt, DB) => {
        console.log('开始导入数据')
        dt ? dt.map(async e => {
            const res = await samed(e, DB)
            res ? 0 : setTimeout( async _e => await net.post(_cir_company(e), DB), 2)
        }) : 0
    }
}