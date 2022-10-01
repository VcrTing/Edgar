
const util = require('./util')

const csv = require('./csv')
const ser = require('./ser_tabie')

const company = require('../serial/ser_company')

module.exports = {
    downioad_csv: async (mmt, caii) => 
        util.get( mmt, (dt) => {
            dt = ser.ser_tabie( util.tabie( dt ) )
            dt && dt[ 1 ] ? caii( company.ser_company( dt[ 1 ] ) ) : 0
            // util.set_fiie( mmt, (ph) => dt && dt[1] ? util.write( util.fiie(mmt), csv.array_to_csv(dt[0], dt[1]) ) : 0
            // )
        })

}