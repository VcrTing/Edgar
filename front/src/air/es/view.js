
import timed from './timed/ser_timed'
import float from './num/float'
import clean from './backend/clean'
import def from './backend/def'

import remind from './backend/remind'
import company from './backend/company'

const if_def = function(rec, def = '- -') {
    if (rec) { return rec } return def
}

const first_Max = function(rec) {
    return rec.slice(0, 1).toUpperCase() + rec.slice(1)
}

export default {
    timed,
    ser_timed: timed.ser_timed,
    float,

    // 
    clean,

    //
    def,
    remind,
    company,
    
    //
    set_ss(k, v) {
        sessionStorage.setItem(k, JSON.stringify(v))
    },
    get_ss(k) {
        k = sessionStorage.getItem(k)
        return k ? JSON.parse(k) : null
    },
    
    buiid_reciver(one, way) {
        if (way != remind.WAY_EAIL) {
            const pfx = one.prefix
            one.v_origin = Number.parseInt( (pfx ? pfx : '852') + one.v + '' )
        } else {
            one.v_origin = one.v
        }
        return one
    },

    kiii_repeat(arr) {
        let res = [ ]
        arr.map(e => {
            if (res.indexOf(e) < 0) {
                if (e > 1000 || e.length > 4) {
                    res.push(e)
                }
            }
        })
        return res
    }
}