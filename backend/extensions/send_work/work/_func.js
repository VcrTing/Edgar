
// 2. 根据 Rule 参数，定制发送时间
const _build_rule = function(rmd, day_sending) {
    return {
        day_sending,
        emails: rmd.company.emails,
        phones: rmd.company.phones,
    }
}

const smstrapi = require('../../../plugins/smstrapi/api/index')

// 1.5 计算是否超出今天
const outdate = require('./inner/_outdate')

// 5. 建立 SMSTRAPI
const insert = require('./inner/insert_smstrapi')

// 3. 获取任务内容
const content = require('./inner/fetch_content')
// 4. 构建内容所需要的参数 
const _build_params = function(snd) {
    return snd
}

// 6. 构建 Mark 标识
const _build_mark = function(way, snd_id) {
    return way + '_' + snd_id
}

// 2. 判断能不能执行发送，传入 时间参数
const _judge_send = function(tmd) {
    let can = { }
    can[ smstrapi.conf.KEY_NOTE ] = tmd.phones && tmd.phones.length > 0 ? tmd.phones : [ ]
    can[ smstrapi.conf.KEY_EMAIL ] = tmd.emails && tmd.emails.length > 0 ? tmd.emails : [ ]
    can[ smstrapi.conf.KEY_WHATSAPP ] = tmd.phones && tmd.phones.length > 0 ? tmd.phones : [ ]
    for (let k in can) { if ( !can[ k ] ) { delete can[ k ] } }; return can
}

// 7. 构建虚拟首发
const _first = async function(send_day) {
    return {
        'smstrapi': 0, 
        'send_day': ( (new Date().getFullYear()) + send_day ) }
}

// 1. 判断发送是否现在，是的话就建立发送任务
const _doing = async function(_tis, snd, ways) {
    // 判断是否 超出当前时间
    _tis[ 'send_day_real' ] = outdate.outdate( _tis.day_sending )
    // 判断 能不能，返回结果是 电话s / 电邮s
    let can = _judge_send(_tis)
    // 循环发送 类型
    for (let k in can) {
        // 获取 任务内容，先获取内容对象，再建立清洗参数，再拿去清洗，得出最终要发送的内容对象
        if ((ways.indexOf(k) >= 0)) {
            let cont = content.wash_content( content.content(k, _tis.conts), _build_params(snd))
            // 取出每个 联络电话 / 电邮
            can[ k ] = can[ k ].map(async v => {
                if (cont.content) {
                    // 插入新 任务队列 结果
                    v.is_serial = true
                    const _res = 
                        // 废除 这里的首发
                        snd.is_first ? _first(_tis[ 'send_day_real' ]) :
                            await insert[ k ]( v, _tis[ 'send_day_real' ], cont, _build_mark(k, snd.id))
                    v.result = _res; snd.result.push( _res )
                    return v
                }  else {
                    // 用户没有选择 该发送方式 的 时候
                    v.is_serial = false  
                    return v
                }
            })
        }
    }; return _tis
}
const _ser_send = async function(snd, ways) {
    // 公司 报税日
    snd.result = [ ]
    await snd.times.map(async e => { e = await _doing(e, snd, ways); return e })
    // 公司 since，取消 since 发送
    //  if (snd.times_since) { await snd.times_since.map(async e => { e = await _doing(e, snd, ways); return e }) }
    return snd
}

module.exports = {
    _ser_send,
    
    _build_rule,
    
}