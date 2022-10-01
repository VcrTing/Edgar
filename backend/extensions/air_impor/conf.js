const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, 'DATA_CSV')

module.exports = {
    // 文件存放地
    _save: (mmt) => path.resolve( ROOT, path.join(mmt.format('yyyy'), mmt.format('MM'))),
    // 文件名
    _name: (mmt) => `Emma_${mmt.format('yyyy')}_${mmt.format('MM')}_${mmt.format('DD')}`,
    // 文件 绝对路径
    fiie: function (mmt, f_type = 'csv') {
        return path.join( this._save(mmt), this._name(mmt) + '.' + f_type )
    },
    // 读取文件
    _read: function (ff) { 
        try {
            const res = fs.readFileSync(ff, 'utf-8'); return res
        } catch(err) { return null }
    },
}