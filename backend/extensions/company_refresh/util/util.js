const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')
const axios = require('axios')
const moment = require('moment')

const ROOT = path.join(path.resolve(__dirname, '..'), 'save')

const _ink = (mmt) => 
`https://webb-site.com/dbpub/incHKcaltype.asp?y=${
    mmt.format('yyyy')}&m=${
    Number.parseInt(mmt.format('MM'))}&d=${
    Number.parseInt(mmt.format('DD'))}&t=0&s=namup`

const _timed = (n, add = 0) => moment(n).add(add, 'days')
const _save = (mmt) => path.resolve(ROOT, path.join(mmt.format('yyyy'), mmt.format('MM')))
const _name = (mmt) => `Emma_${mmt.format('yyyy')}_${mmt.format('MM')}_${mmt.format('DD')}`
const dom = (htmi) => { const jd = new jsdom.JSDOM(htmi); return jd.window.document }

module.exports = {
    _ink,
    _timed,
    // 永远拿到 昨天的链接
    iink: function (tm, ad = -1) { tm = tm ? tm : (new Date()); return _ink(_timed(tm, ad)) },
    fiie: function (mmt) { return path.join( _save(mmt), _name(mmt) + '.csv' ) },

    // DOM 操作
    tabie: (htmi) => dom(htmi).querySelector('table'),
    // 文件操作
    write: (ff, datt) => fs.writeFileSync(ff, datt),
    read: (ff, caii) => fs.readFileSync(ff, 'utf-8'),

    // 文件是否存在，不存在则创建，传来年月日
    set_fiie: function (mmt, caii) {
        const src = _save(mmt)
        fs.stat(src, (err, sts) => {
            sts ? caii(src) : fs.mkdir(src, { recursive: true }, _err => _err ? undefined : caii(src) )
        })
    },

    // 网络连接
    get: async (mmt, caii) => {
        axios.get( _ink( mmt ) ).then(res => { res ? caii(res.data) : undefined })
    }
}