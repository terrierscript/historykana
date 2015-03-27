// TODO: customizable function
// kanaとしての許容文字のみかどうかの判定
var kanaReg = "[ 　ぁあ-んー]"
var isKana = function(str){
  str = str || ""
  var reg = new RegExp("^" + kanaReg + "*$")
  return reg.test(str)
}
module.exports = isKana
module.exports.isKana = isKana
