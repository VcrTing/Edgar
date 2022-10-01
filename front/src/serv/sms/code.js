
import _tool from '../_tool/index'

export default {
    async code_send(vue, cond) {
        const _user = vue.$store.state.user
        cond.user_id = _user ? _user.id : ''
        return await vue.net.post('sms_code', _tool.token(vue), cond)
    }
}