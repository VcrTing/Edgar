const conf = require('../../conf')
const key = require('../../work/data/key')
const api = require('../../work/api/whatsapp')

const WAY = conf.KEY_WHATSAPP
const DEF_URI = 'https://strapi08.svr.up5d.com/'

const build_params = function(code, phoned) {
    return {
        name: api.switch_Tempiate(),
        recipient: api.buiid_phone(phoned),
        components: [
            {
                type: 'body',
                parameters: [
                    { type: 'text', text: code }, 
                    { type: 'text', text: phoned }
                ]
            }
        ]
    }
}

const _send = async function(uri, param, jwt) {return await api.send( uri, param, jwt ) }

module.exports = {
    send_code: async (code, phoned) => {
        
        const ky = await key[ WAY ]( WAY )
        if (ky && ky.sid) {
            const uri = ky.mark ? ky.mark : DEF_URI
            const jwt = await api.token(ky.sid, ky.token, uri)
            try {
                await _send(uri, build_params(code, phoned), jwt)
            } catch(err) {
                setTimeout( async e => await _send(uri, build_params(code, phoned), jwt), 3000)
            }
        }
    }
}