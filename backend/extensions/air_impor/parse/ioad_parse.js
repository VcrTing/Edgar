
const papaparse = require('papaparse')

const _header_cont = function(src) {
    if (src) {
        const err = src.errors
        src = src ? src.data : [ ]
        return [ src.shift(), src, err ]
    }
}

const parse_array = function(txt) {
    let res = papaparse.parse(txt)
    return _header_cont(res)
}

module.exports = {
    parse_array
}