const get = require('../utils/get')

const func = require('./_func')

// 6. 修改 SEND
const upd = require('../utils/upd')

module.exports = async function() {
    // 规定时间
    const year = new Date().getFullYear()
    // 搜索 Send
    let sends = await get.getSend(year)
    // 操作 Send
    sends.map(async e => { 

        // 解析 Way
        let way = e.remind.send_way_world
        way = way ? way.split('_') : [ ]
        
        // 序列化 Send，生成发送
        try { e = await func._ser_send( e, way ) } catch( err ) { }

        // 修改 结果
        await upd.updSend_Result(e)
    })
}

/*

序列化好之后的 Times

[
  {
    "day_sending": "2022-01-02",
    "emails": [
      {
        "v": "vcrting@163.com",
        "is_serial": true,
        "result": {
          "smstrapi": 18,
          "send_day": "2023-01-02",
          "to": "vcrting@163.com"
        }
      }
    ],
    "phones": [
      {
        "v": "92779625",
        "is_serial": false
      }
    ],
    "conts": {
      "note": {
        "id": 1
      },
      "email": {
        "id": 1
      },
      "whatsapp": {
        "id": 1
      }
    }
  }
]

*/