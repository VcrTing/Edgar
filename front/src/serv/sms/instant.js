
import _tool from '../_tool/index'

export default {
    async instant_remind_add(vue, company, ways) {
        let phs = company.phones
        phs = phs ? phs.map(e => e.v_origin) : [ ]
        let ems = company.emails
        ems = ems ? ems.map(e => e.v_origin) : [ ]
        let nn = company.names
        nn = nn ? vue.view.company.active_name(nn) : ''

        let is_emaii = false
        let is_whatsapp = false

        if (ways) {
            ways.map( e => { if (e == vue.view.remind.WAY_EAIL) { is_emaii = true } else if (e == vue.view.remind.WAY_WHATSAPP) { is_whatsapp = true } })
    
            await vue.net.post('sms_instant_add', _tool.token(vue), { 
                phones: is_whatsapp ? phs : [ ], emails: is_emaii ? ems : [ ], company_name: nn })
        }
    }
}