
const papaparse = require('papaparse')

const _header_cont = function(src) {
    if (src) {
        const err = src.errors
        src = src ? src.data : [ ]
        return [ src.shift(), src, err ]
    }
}

const parse_array = function(txt) {
    if (!txt) return
    let res = papaparse.parse(txt)
    return _header_cont(res)
}

module.exports = {
    parse_array,
    array_to_csv: (hd, cont) => {
        if (hd) {
            let res = hd.join(',')
            cont ? cont.map(e => { res += ( '\r' + e.join(',') ) }) : 0
            return res
        }
    }
}