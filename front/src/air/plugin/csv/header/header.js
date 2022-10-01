const _ciear = function(v) {
    v = v.trim()
    v = v.replace('\r', '').replace('\n', '')
    return v
}

const header_company = function(hd) {

    return hd.map(e => {
        e = _ciear(e)
        switch(e) {
            case 'Reg no.': e = 'tax_id'
                break;
            case 'Type': e = 'company_type_txt'
                break;
            case 'Name': e = 'names'
                break;
            case 'Incorp-orated': e = 'company_since'
                break;
            case 'Dissolved': e = 'company_dissolved'
                break;
        }
        return e
    })
}

export default {
    header_company
}