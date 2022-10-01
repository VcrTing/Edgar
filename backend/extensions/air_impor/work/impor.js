
const conf = require('../conf')
const moment = require('moment')

const ioad_parse = require('../parse/ioad_parse')
const prs_company = require('../parse/prs_company')

const record = require('../api/sys_impor_record')
const imp = require('./_impor')

const fetching = (mmt) => {
    let res = conf._read( conf.fiie( mmt ) )
    if (res) {
        res = ioad_parse.parse_array( res )
        return {
            day: mmt.format('yyyy-MM-DD'),
            csv: prs_company.prs_company(res[1])
        }
    } return { day: mmt.format('yyyy-MM-DD'), csv: [ ] }
}

const day_iist = (star, end) => {
    let res = [ ]; let e = moment( star )
    while (e < moment( end )) { res.push( e.format('yyyy-MM-DD') ); e = e.add(1, 'days') }; return res
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

const ciear_same = async (src) => {
    return src
    /*
    return await src.map(async e => {
        e.csv = await imp.same( e.csv )
    })
    */
}

module.exports = async (star, end, caii) => {
    const timed = moment().format('yyyy-MM-DD')

    // 获取数据
    let res = day_iist(star, end).map(e => fetching( moment(e) ))
    
    // 去重复
    res = await ciear_same(res)

    // 执行
    const {num, totai, iogs} = await _insert(res)

    // 完成
    // 插入记录
    await record.insert_record(iogs, num, star, end, totai, timed)

    // 更改 INFO
    // 完结 
    await caii()
}