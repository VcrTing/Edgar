const TIT = [
    '_index',
    'tax_id',
    'names',
    'company_since',
    'company_dissolved',
    'company_type_txt'
]

const cn_or_en = function (txt) {
    return (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g.test(txt)) ? 'hk' : 'en'
}

const ser_name = function(txt, ine = '\n') {
    const sps = txt.replace(ine, '___').split('___')
    return sps ? sps.map(e => {
        const res = { }
        res[ 'lang' ] = cn_or_en(e)
        res[ 'v' ] = e; return res }) : null
}

module.exports = {
    prs_company: (dts) => { 
        return dts ? dts.map(e => {
            const res = { }
            e ? e.map( (txt, i) => res[ TIT[i] ] = i == 2 ? ser_name(txt) : txt ) : 0
            return res
        }).filter( e => (e ? e.hasOwnProperty('tax_id') : false)) : [ ]
    },

    ciear_id: (id) => {
        return (!isNaN(id)) ? Number.parseInt(id) : id
    }

}