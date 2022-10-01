const conts = require('../../save/msg')
const outdate = require('./_outdate')

const WASH_KEY = [ 'subject', 'content' ]
/*
    DATA 参数要准备三个字段，user、company、remind
*/
const WASH_DEALING = {
    'user_email': (txt, data) => txt ? txt.replace('{{user_email}}', data.user.email ? data.user.email : data.email) : 0,
    'company_named': (txt, data) => {
        let res = undefined
        const _src = data.company ? data.company.names : null
        if (_src) {
            if (_src[0]) {
                if (_src[0].txt) { res = _src[0].txt }
                if (_src[0].v) { res = _src[0].v }
            } 
            if (!res) {
                if (_src[1].txt) { res = _src[1].txt }
                if (_src[1].v) { res = _src[1].v }
            } } else {
                res = data.name
            }
        return txt ? txt.replace('{{company_named}}', res ? res : '(暫無公司名稱)') : ''
    },
    'filling_timed': (txt, data) => txt ? txt.replace('{{filling_timed}}', outdate.outdate( new Date().getFullYear() + '-' + data.remind.send_date_real_str) ) : 0,
}

// 清洗内容
const _wash = function(txt, data) {
    for (let k in WASH_DEALING) {
        txt = WASH_DEALING[ k ]( txt, data )
    }; return txt
}
// 循环字段，每一个字段所属的内容，都进行清洗
const wash_content = function(conts, data) {
    WASH_KEY.map(e => {
        conts[ e ] = _wash( conts[ e ], data )
    }); return conts
}

// 根据 ID 搜取内容
const _cont_by_id = function(id, way) { 
    let c = conts[ way ].filter(e => e.id == id)
    c = c && c.length > 0 ? c[0] : conts[ 'error' ] 
    return JSON.parse(JSON.stringify(c))
}

module.exports = {
    // 插入首发
    get_first: function(ways, _id = 2) {
        let res = { }
        ways.map(_w => { res[_w] = { id: _cont_by_id(_id, _w).id } })
        return res
    },

    // 插入系统自带的 提醒模版
    get_def_content: function(way) {
        let c = _cont_by_id(1, way) 
        return { id: c.id }
    },
    
    // 获取内容
    content: function(way, ids) {
        return _cont_by_id(ids[ way ].id, way)
    },

    // 清洗内容
    wash_content
}