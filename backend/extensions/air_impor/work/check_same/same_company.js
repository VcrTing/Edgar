
const DATAS = require('./same_data')

const ciear_id = (id) => {
    return (!isNaN(id)) ? Number.parseInt(id) : id
}

module.exports = {
    ciear_id,
    
    has_by_tax_id: (dt) => {
        let res = false
        dt = dt[ 'tax_id' ] ? dt[ 'tax_id' ] : null
        DATAS.map(e => { if (e.indexOf(`_${ciear_id(dt)}_`) >= 0) { res = true } })
        return res
    },
}