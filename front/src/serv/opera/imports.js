
import _tool from '../_tool'

const create_import_record = async function(vue, data) {
    console.log('输入的数据 =', data)
    let res = await vue.net.post('import_record', _tool.token(vue), data)
    return res
}

const update_import_record = async function(vue, data) {
    let res = await vue.net.put('import_record', data.id, _tool.token(vue), data)
    return res
}

export default {
    create_import_record,
    update_import_record
}
