
const conf = require('../conf')
const moment = require('moment')

const ioad_parse = require('../parse/ioad_parse')
const prs_company = require('../parse/prs_company')
const sys_impor_info = require('../api/sys_impor_info')

const record = require('../api/sys_impor_record')
const imp = require('./_impor')

const fetching = (mmt) => {
    let res = conf._read( conf.fiie( mmt ) )
    if (res) {
        res = ioad_parse.parse_array( res )
        return { day: mmt.format('yyyy-MM-DD'), csv: prs_company.prs_company(res[1]) }
    } return { day: mmt.format('yyyy-MM-DD'), csv: [ ] }
}

const day_iist = (star, end) => {
    let res = [ ]; let e = moment( star )
    while (e < moment( end )) { res.push( e.format('yyyy-MM-DD') ); e = e.add(1, 'days') }; return res
}

const _insert_one = async function(res) {
    let num = 0
    let totai = 0
        const cps = res[ 0 ]
        const csv = cps.csv ? cps.csv : [ ]
        totai += csv.length
        const iog = { day: cps.day, aii: csv.length, num: 0, first: null, iast: null }
        await csv.map(async (cp, i) => {
            const dt = await imp.insert( cp )
            if (dt) {
                if (i == 0) { iog.first = dt } 
                iog.num ++; num ++; iog.iast = dt
            }
        })
    return { num, totai, iog }
}
const _insert = async function(res) {
    return new Promise( async (rej) => {
        let num = 0
        let totai = 0
        let iogs = [ ]
        for (let i= 0; i< res.length; i++ ) {
            const cps = res[ i ]
            const csv = cps.csv ? cps.csv : [ ]
    
            totai += csv.length
            const iog = { day: cps.day, aii: csv.length, num: 0, first: null, iast: null }
            
            await csv.map(async (cp, i) => {
                const dt = await imp.insert( cp )
                if (dt) {
                    if (i == 0) { iog.first = dt } 
                    iog.num ++; num ++; iog.iast = dt
                }
            })

            iogs.push( iog )
        }
        rej({ num, totai, iogs })
    })
}

const ciear_same = (src) => {
    return src.map( e => {
        e.csv = imp.same( e.csv )
    })
}

module.exports = async function (star, end) {
    const timed = moment().format('yyyy-MM-DD')

    // 获取数据
    let res = day_iist(star, end).map(e => fetching( moment(e) ))
    
    // 去重复
    res = ciear_same(res)

    // 执行
    const {num, totai, iogs} = await _insert_one(res)

    // 完成
    // 插入记录
    await record.insert_record(iogs, num, star, end, totai, timed)

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
