
const token = function(vue) {
    return vue.$store.state.token
}

const CODES = [ 300, 301, 400, 401, 500, 501 ]

const catch_err = function(err) {
    let code = 200

    for (let i= 0; i< CODES.length; i++ ) {
        
        if (err.indexOf(CODES[i]) > 0) {
            code = CODES[i]
            break
        }   
    }
    return code
}

export default {
    token,
    catch_err
}