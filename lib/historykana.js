var partialize = require("./partial")
var extend = require("extend")
var util = require("util")

function HistoryKana(options){
  var defaults = {
    kanaRegexp : "^[ 　ぁあ-んー]*$"
  }

  this.options = extend({}, defaults, options)
  var regExp = this.options.kanaRegexp
  if(!util.isRegExp(regExp)){
    regExp = new RegExp(regExp)
  }
  this.kanaRegexp = regExp
}

HistoryKana.prototype.isKana = function(str){
  str = str || ""
  return this.kanaRegexp.test(str)
}

// を === お
HistoryKana.prototype.isSameKana = function(str1, str2){
  if(!this.isKana(str1)){
    return false
  }
  if(!this.isKana(str2)){
    return false
  }
  return str1.replace("を", "お") === str2.replace("を", "お")
}

// remove concurrent same value.
HistoryKana.prototype.shrink = function(histories){
  return histories.reduce(function(result, value){
    var last = result[result.length - 1]
    if(last === undefined || last !== value){
      result.push(value)
    }
    return result
  }, [])
}

HistoryKana.prototype.execute = function(histories){
  histories = this.shrink(histories)
  var partialized = partialize(histories)
  var kana = this.extractKana(partialized)
  return kana.join("")
}

HistoryKana.prototype.extractKana = function(partialized){
  var self = this
  return partialized.map(function(group){
    var kanas = group.filter(function(value){
      return self.isKana(value)
    })
    return kanas.reduce(function(result, kana){
      if(self.isSameKana(result, kana)){
        return kana
      }
      return result
    }, kanas[0])
  })
}

module.exports = function(histories, options){
  var kana = new HistoryKana(options)
  return kana.execute(histories)
}

module.exports.HistoryKana = HistoryKana
