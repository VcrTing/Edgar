
const conf = require('../conf')
const moment = require('moment')

const ioad_parse = require('../parse/ioad_parse')
const prs_company = require('../parse/prs_company')

const record = require('../api/sys_impor_record')
const imp = require('./_impor')

const fetching = (mmt) => {
    let res = conf._read( conf.fiie( mmt ) )
    if (res) { res = ioad_parse.parse_array( res ); return prs_company.prs_company(res[1]) } return [ ]
}

const day_iist = (star, end) => {
    let res = [ ]; let e = moment( star )
    while (e < moment( end )) { res.push( e.format('yyyy-MM-DD') ); e = e.add(1, 'days') }; return res
}

const _insert_one = async function(res, star) {
    let num = 0
    const csv = res ? res : [ ]
    const iog = { first: null, iast: null, day: moment( star ).format('yyyy-MM-DD')}
    await csv.map(async (cp, i) => {
        const dt = await imp.insert( cp )
        if (dt) { 
            if (i == 0) { iog.first = dt }; num ++; iog.iast = dt }
    })
    return { num, totai : csv.length, iog }
}

const ciear_same = (src) => {
    return src.map( e => imp.same( e ))
}

module.exports = async function (star, end, timed = moment().format('yyyy-MM-DD')) {

    // 获取数据
    let res = day_iist(star, end).map(e => fetching( moment(e) ))
    
    // 去重复
    res = ciear_same(res)

    // 执行
    const {num, totai, iogs} = await _insert_one(res, star)

    // 完成
    // 插入记录
    await record.insert_record(iogs, num, star, end, totai, timed)

}