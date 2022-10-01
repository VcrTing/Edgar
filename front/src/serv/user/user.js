
import _tool from '../_tool'

const user_from_strapi = async function(vue, wordpress_id, email) {
    let condition = {
        wordpress_id
        // 'filters[email][$in][0]': email,
        // 'filters[wordpress_id][$in][0]': wordpress_id,
    }
    let res = await vue.net.get('user', _tool.token(vue), condition)
    return res && res.length > 0 ? res[0] : null
}



export default {
    user_from_strapi
}