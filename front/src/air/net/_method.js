
import conf from '../../conf'

import tool from './_too'
import net from './_api'

import axios from 'axios'

const _net = async function( url, token, params, method = 'GET', data) {
    return await net({ 
        url, params, method, data,
        headers: tool.headers(token) })
}
/*
const get = async function(uri, token, data){    
    const url = conf.API + conf.ENDPOINT[ uri ]
    let res = await axios.get(url, {
        params: data,
        headers: tool.headers(token)
    })
    console.log(url, ' DATA =', data)
    return res
}
*/

const get = async function( uri, token, data ) {
    const url = conf.API + conf.ENDPOINT[ uri ]
    console.log('URL =', url, ' DATA =', data)
    let res = await _net(url, token, data)
    return res
}

const get_one = async function( uri, cdt, token, data ) {
    const url = conf.API + conf.ENDPOINT[ uri ] + '/' + cdt
    let res = await _net(url, token, data)
    return res
}

const post = async function( uri, token, data ) {
    const url = conf.API + conf.ENDPOINT[ uri ]
    let res = await _net(url, token, {}, 'POST', data)
    return res
}
const put = async function(uri, id, token, data ) {
    const url = conf.API + conf.ENDPOINT[ uri ] + '/' + id
    let res = await _net(url, token, {}, 'PUT', data)
    return res
}

const trash = async function(uri, id, token) {
    const url = conf.API + conf.ENDPOINT[ uri ] + '/' + id
    let res = await _net(url, token, {}, 'DELETE', {})
    return res
}
export default {
    get,
    get_one,

    put,
    post,

    trash
}