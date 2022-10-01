let LANG = [ 'en', 'hk' ]

let COMPANY_TYPE = [
    'Limited Liability Company',
    'Other',
]
const company_type = function(ct) {
    ct = COMPANY_TYPE[ct - 1]
    return ct ? ct : ''
}

const convert_names = function(names) {
    let res = { }
    names.map(n => {
        if (n.lang == 'hk') {
            res.name_ch = n.txt ? n.txt : n.v
        } else if (n.lang == 'en') {
            res.name_en = n.txt ? n.txt : n.v
        }
    })
    return res
}

const active_name = function(names) {
    let res = undefined
    const _src = names
    if (_src) {
        if (_src[0]) {
            if (_src[0].txt) { res = _src[0].txt }
            if (_src[0].v) { res = _src[0].v }
        } 
        if (!res) {
            if (_src[1].txt) { res = _src[1].txt }
            if (_src[1].v) { res = _src[1].v }
        } }
    return  res ? res : '(暫無公司名稱)' 
}

export default {
    company_type,
    convert_names,
    active_name
}