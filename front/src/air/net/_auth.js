
import tool from './_too'
import conf from '../../conf'

import axios from 'axios'

const login = async function(identifier, password) {
    let res = await axios.post(
        conf.API + '/auth/local', 
        { identifier, password },
        { header: tool.headers() }
    )
    return res && res.status > 199 ? res.data : null
}

const _admin = async function() {
    let res = await login(
        conf.STRAPI.named,
        conf.STRAPI.pass )
    res = res ? res.jwt : ''
    return res
}

export default {

    _admin,
    login,
}