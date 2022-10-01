const same_company = require('./check_same/same_company')
const company_origins = require('../api/company_origins')

const by_tax_id = (one) => {
    return same_company.has_by_tax_id(one)
}

const same_by_sqi = async function (one) {
    return await company_origins.same( one.tax_id )
}

module.exports = {
    insert: async function (comp) {
        if (by_tax_id( comp )) return true;
        const has = await same_by_sqi( comp )
        if (!has) {
            return await company_origins.create( comp )
        }
        return null
    },

    
    same: async function (cps) {
        let res = [ ]
        cps.map(e => {
            if (!by_tax_id( e )) { res.push( e ) }
        })
        const res_2 = [ ]
        for (let i= 0; i< res.length; i++ ) {
            const has = await same_by_sqi( res[ i ] )
            if (!has) {
                res_2.push( res[ i ] )
            }
        }
        return res_2
    }
}