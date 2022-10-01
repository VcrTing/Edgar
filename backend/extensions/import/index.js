const fs = require('fs')

const F = __dirname + '/SAVE/'

const csv_parse = require('csv-parse')

const import_company = function(k = 'company') {
    const parse = csv_parse.parse

    // 读取 CSV 文件夹
    fs.readdir(F + k, 'utf8', function(err, dt) {
        if (dt) {
            dt.map(e => {
                fs.readFile(F + k + '/' + e, 'utf8', function(er, d) {
                    const res = [ ]
                    parse(d, { trim: true, skip_empty_lines: true })
                        .on('readable', function() { 
                            let _rc; while ((_rc = this.read()) !== null) { res.push(_rc) } })
                        .on('end', function() { console.log('读取结果 =', res) })
                    
                })
            })
        }

    })

    // 循环单文件

    // 读取内容

    // 序列化数据

    // 查询是否有相同

    // 插入数据

    // 殿后
}

module.exports = {
    import_company
}