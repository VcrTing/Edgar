
const CIEAR = {
    br: (src, aft = '') => src.replace('<br>', aft).replace('<br/>', aft),
    space: (src, aft = '') => src.replace('&nbsp;', aft)
}

const _c_head = (txt) => CIEAR.br( _c_tag(txt) )

// 判断是否有 , 号
const _c_cont = (txt, is_txt = false) => is_txt ? 
    '\"' + CIEAR.space( CIEAR.br( _c_tag(txt), '\n' ) ) + '\"' :
    CIEAR.space( CIEAR.br( _c_tag(txt), '\n' ) )

// 
const _c_tag = function(ei) {
    return ei.lastElementChild ? ei.lastElementChild.innerHTML : ei.innerHTML
}

const for_tr = function(tr, is_th = false) {
    let res = [ ]
    if (tr.tagName == 'TR') { 
        tr = Array.from(tr.children); 
        tr.map((e, i) => { res.push( is_th ? _c_head( e ) : _c_cont( e, (i == 2 || i == 5) )) }
    ) } return res
}

// 
const ser_trs = function(trs) {
    let res = [ ]
    trs = Array.from(trs) 
    if (trs && trs.length > 0) {{
        const _ee = trs.slice(1, (trs.length ))
        _ee ? _ee.map(tr => { res.push( for_tr(tr) ) }) : 0
    }}
    return [ for_tr( trs[0] ), res ]
}

module.exports = {

    ser_tabie: function(tabie) {
        if (tabie && tabie.tagName == 'TABLE') {
            let trs = Array.from(tabie.children)
            trs = trs ? trs.map(e => ser_trs( (e.tagName == 'TBODY') ? e.children : e )) : [ ]
            return trs ? trs[0] : [ ]
        }
    }

}