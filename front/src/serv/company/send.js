
import _tool from '../_tool'
import moment from 'moment'

const build_search = function(q) {
    let res = { _limit: 99 }
    if (q) {
        if (Number.parseInt(q)) { res['tax_id_contains'] = Number.parseInt(q)
        } else { res['names_contains'] = q  } }
    return res
}

// 构建 send
const buiid_send = function(snd, ret) {
    let res = ret ? ret : { }
    return Object.assign(res, snd)
}

// 处理 send
// 1
const kiii_stop_and_first = function(src) {
    let res = [ ]
    const yy = Number.parseInt(new Date().getFullYear() + '')
    src.filter(e => {
        const _st = e.remind.is_stop; 
        if (!_st || e.is_first) { 
            // 去掉 result == null
            if (e.result != null) {
                // 去掉 非首发，且非今年的 发送
                if (e.work_year == 0 || e.work_year == yy) {
                    res.push( e )
                }
            }
        }
    }); return res }
// 2
const ser_many_to_front = function(sends) {
    let res = [ ]
    console.log('源头 =', sends)
    sends ? sends.map(e => {
        if (e.is_first) {
            res.push(
                Object.assign( e, {
                    send_day: e.updated_at, way: e.remind ? e.remind.send_way_world : '',
                } )
            )
        } else {
            e.result.map(_re => {
                if ( _re ) {
                    res.push( buiid_send(e, _re) )
                }
            })
        }
    }) : [ ]
    return res
}
// 3 // 判断是否 发送，以及今年的发送
const ser_sends_sended = function(sends) {
    const nn = moment(new Date())
    return sends.map(e => {
        e.is_sended = false
        if (moment(e.send_day) < nn) { e.is_sended = true }; return e
    })
}

const many = async function( vue, data = { _limit: 999 }) {
    // 过滤有效 COMPANY
    data[ 'company.status' ] = true
    let src = await vue.net.get('send', _tool.token(vue), data)
    if (src) {
        src = kiii_stop_and_first(src)
    } return ser_sends_sended(
        ser_many_to_front(src)
    )
}

const one = async function(vue, id) {
    let res = await vue.net.get_one('send', id, _tool.token(vue), null)
    return res
}

const trash = async function(vue, data) {
    return await vue.net.trash('send', data.id, _tool.token(vue))
}

const trash_send = async function(vue, data) {
    return await vue.net.post('trash_sms', _tool.token(vue), {
        way: data.way, ids: data.ids
    })
}

export default {
    one,
    many,
    trash,
    trash_send
}

