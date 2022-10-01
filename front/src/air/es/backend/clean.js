const _data = function(res, def = [ ]) { return res ? res.data : def }

const _insert = function(src) { src.attributes.id = src.id; return src.attributes }

const clean = function(res) {
    return res
    res = _data(res)
    return (res.constructor == Array) ? res.map( e => _insert(e) ) : (res ? _insert(res) : null)
}


export default clean