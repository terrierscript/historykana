var compactDiff = require("compact-diff")

var isChanged = function(diff){
  return (diff.added || diff.removed)
}

var diffEdge = function(diffs){
  var stop = false
  return diffs.reduce(function(result, diff){
    if(isChanged(diff) || stop){
      stop = true
      return result
    }
    result.push(diff)
    return result
  }, []).map(function(diff){
    return diff.value
  })
}

var getBreakPoint = function(array){
  var head = array[0]
  var left, right
  var breakpoint = -1
  // detect breakpoint
  array.forEach(function(value, i){
    if(!array[i + 1] || head === value || breakpoint > -1){
      return
    }
    var diffs = compactDiff(value, head)
    // console.log(diffs, value, head, left, right)
    var _left = diffEdge(diffs).join("")
    var _right = diffEdge(diffs.concat().reverse()).reverse().join("")
    if(left === undefined && right === undefined){
      left = _left
      right = _right
    }
    // break
    if(left !== _left){
      if(right === "" && _left === ""){
        breakpoint = i
        return
      }
      left = _left
    }
    if(right !== _right){
      if(left === "" && _right === ""){
        breakpoint = i
        return
      }
      right = _right
    }
  })
  return {
    breakpoint : breakpoint,
    left : left,
    right : right
  }
}

var sanitize = function(array, left, right){
  return array.map(function(value){
    var reg = new RegExp("^" + left + "(.*)" + right + "$")
    return value.replace(reg, "$1")
  })
}
var split = function(array, breakpoint){
  var left = array.concat() // copy
  var right = left.splice(0, breakpoint - 1)
  return {
    left : left,
    right : right
  }
}
var partialize = function(array){
  var breaks = getBreakPoint(array)
  // console.log(breaks, array)
  if(breaks.breakpoint === -1){
    if(array[0] === ""){
      return []
    }
    return [array]
  }
  var splited = split(array, breaks.breakpoint)
  var rest = splited.left
  var hitted = sanitize(splited.right, breaks.left, breaks.right)
  var r = partialize(rest)
  var h = partialize(hitted)
  if(breaks.left !== ""){
    return r.concat(h)
  }else if(breaks.right !== ""){
    return h.concat(r)
  }
}

var partial = function(array, result){
  result = result || []
  var part = partialize(array)
  return part
}
module.exports = function(array){
  var result = partial(array, [])
  return result
}
