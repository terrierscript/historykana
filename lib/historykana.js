var kanachar = require("./kanachar")
var partial = require("./partial")

// を === お
var isSameKana = function(str1, str2){
  if(!kanachar(str1)){
    return false
  }
  if(!kanachar(str2)){
    return false
  }
  return str1.replace("を", "お") === str2.replace("を", "お")
}

var getKana = function(group){
  var kanas = group.filter(function(value){
    return kanachar(value)
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

module.exports = function(histories, opts){
  histories = shrink(histories)
  var partialized = partial(histories)
  var kana = partialized.map(getKana)
  return {
    kana : kana.join(""),
    partial : partialized
  }
}
