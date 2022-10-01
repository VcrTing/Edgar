
const headers = function(token) {
    let res = { 'content-type': 'application/json' }
    if (token) { res['Authorization'] = 'Bearer ' + token }
    return res
}

const param = function(condition) {
    let res = '?'
    if (JSON.stringify(condition) == '{}') { } else {
        for (const k in condition) { res += ( k + '=' + condition[k] + '&' ) }
    }
    return res
}

const success = function(res) { return (res && res.data) ? res.data : null }


export default {

    param,
    headers,
    success,
}