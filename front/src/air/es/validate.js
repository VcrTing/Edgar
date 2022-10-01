

const val_char_price = function(v, txt) {
  let char = /[`~!@#$%^&*(“”‘’'、～·！—_+|=;？，。\\)<>?:"{},\/;'[\]]/;
  if (char.test(v)) { return txt + '中不應有除了.之外的特殊字符。' }
  return true
}
const val_timed = function(v, txt, short) {
  if (short) {
    if ((v.length > 10) && (v.length < 8)) { return txt + '字符長度不符合！' }
    let char = /[`~!@#$%^&*(“”‘’'、～·！_+|=;？，。\\)<>?:"{},.\/;'[\]]/;
    if (char.test(v)) { return txt + '中不應有除了 - 之外的特殊字符。' }
  }
  return true
}

// true 为通过
const val_phone = function(v) {
  let res = v ? true : false
  try {
    res = v.length > 6 && v.length < 18 
    res = Number.parseInt(v) ? true : false  } catch(err) { }
  return res
}
const val_email = function(v) {
  let char = /[`~!$^&*(“”‘’'、`～·！—_|=;？，。\\)<>?:"{},\/;'[\]]/;

  if (char.test(v)) { return false }

  char = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
  return char.test(v)
}

// 中英文

const val_chinese = function(str) {
  const re = new RegExp('[\\u4E00-\\u9FFF]', 'g')
  return re.test(str);       
}

module.exports = {
  // 空
  empty(v) {
    if ((v == null || v == '')) { return null } else { v = v.trim() }
    return v
  },

  val_email,
  val_phone,
  
  val_chinese
}