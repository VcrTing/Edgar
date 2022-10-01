
import _tool from '../_tool'
import send from './send'
import moment from 'moment'

const create = async function(vue, data) {
    let res = await vue.net.post('remind', _tool.token(vue), data)
    return res
}

const remind_update = async function(vue, data) {
    let res = await vue.net.put('remind', data.id, _tool.token(vue), data)
    return res
}
//
const remind_one = async function(vue, id) {
    let res = await vue.net.get_one('remind', id, _tool.token(vue), null)
    return vue.view.clean( res )
}
const remind_by_comp = async function(vue, comp_id) {
    let res = await vue.net.get('remind', _tool.token(vue), { 'company.id': comp_id })
    return res && res.length > 0 ? res[0] : null
}
// 提醒的改动
const _build_dt_str = function(src) { return moment(src).format('MM-DD') }
const remind_update_for_send = async function(vue, comp) {
    // 1. 首发不需要更改，
    let rmd = await remind_by_comp(vue, comp.id)
    let res = { id: rmd.id, work_year: '_'}
    // 2. 更改提醒暂时也不用做
    // 3. 删除 work_year 为今年的 SEND
    let snd = await send.many(vue, { 'remind.id': rmd.id, 'work_year': (new Date().getFullYear()) })
    snd.map(async e => { await send.trash(vue, e) })
    // 4. Remind 的 Work_year 改为 _
    res['send_date_real_str'] = _build_dt_str(comp.last_tax_filing_time)
    res['send_date_since_real_str'] = _build_dt_str(comp.company_since)
    // 5. 改动 Remind 的讯息
    return await remind_update(vue, res)
}



export default {
    create,
    remind_update,
    remind_update_for_send
}
