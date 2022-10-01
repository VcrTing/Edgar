import moment from "moment"


export default {
    _now() { return moment(new Date()).format('yyyy-MM-DD hh:mm:ss') },

    sav_timed(uid) { sessionStorage.setItem('vertify_timed_' + uid, moment(new Date()).format('yyyy-MM-DD hh:mm:ss') )},

    _g_code(L = 6){
        let res = [ ]
        for (let i= 0; i< L; i++ ) {
            const cc = Math.floor(Math.random() * 10)
            res.push(cc + '')
        }
        return res.join('')
    },
    genate_code() { return this._g_code() + '' },

    cansend(uid, itv = 35) {
        let tt = sessionStorage.getItem('vertify_timed_' + uid); 
        tt = tt ? (moment( this._now() ).diff(moment(tt), 'seconds')) : itv
        return tt >= itv
    }
}