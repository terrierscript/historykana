var partialize = require("./partial")
var extend = require("extend")
var util = require("util")

var kanaRegexp = new RegExp("^[ 　ぁあ-んー]*$")
var isKana = function(str){
  str = str || ""
  return kanaRegexp.test(str)
}

// を === お
var isSameKana = function(str1, str2){
  if(!isKana(str1)){
    return false
  }
  if(!isKana(str2)){
    return false
  }
  return str1.replace("を", "お") === str2.replace("を", "お")
}

var getKana = function(group){
  var kanas = group.filter(function(value){
    return isKana(value)
  })
  return kanas.reduce(function(result, kana){
    if(isSameKana(result, kana)){
      return kana
    }
    return result
  }, kanas[0])

}

// remove concurrent same value.
var shrink = function(histories){
  return histories.reduce(function(result, value){
    var last = result[result.length - 1]
    if(last === undefined || last !== value){
      result.push(value)
    }
    return result
  }, [])
}

function HistoryKana(options){
  var defaults = {
    kanaRegexp : "^[ 　ぁあ-んー]*$"
  }

  this.options = extend({}, defaults, options)
}
HistoryKana.prototype.execute = function(histories){
  histories = shrink(histories)
  var partialized = partialize(histories)
  var kana = partialized.map(getKana)
  return kana.join("")
}

module.exports = function(histories, options){
  var kana = new HistoryKana(options)
  return kana.execute(histories)
}

module.exports.HistoryKana = HistoryKana
