
const array_split = function(src) {
    const max = 7
    const src_LEN = src.length

    let res = [ ]
    if (src_LEN < max) {
        return [ src ]
    } else {
        let _lis = [ ]
        const _ss = Math.ceil( src_LEN / max )
        for (let i= 0; i< _ss; i++ ) {
            _lis = src.slice( i * max, (i+ 1) * max ) 
            res.push( _lis )
        }
    }
    return res
}

const csv_map = function(hd, conts) {
    conts = conts ? conts : [ ]
    return conts.map(ct => {
        const _dt = { }
        ct.map((e, i) => { _dt[ hd[i] ] = e })
        return _dt
    })
}

export default {
    csv_map,
    array_split
}