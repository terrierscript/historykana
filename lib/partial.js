var compactDiff = require("compact-diff")

var isChanged = function(diff){
  return (diff.added || diff.removed)
}


var diffEdgeLeft = function(diffs){
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

var diffEdgeRight = function(diffs){
  return diffEdgeLeft(diffs.concat().reverse()).reverse()
}
var getEdges = function(value1, value2){
  var diffs = compactDiff(value1, value2)
  return {
    left : diffEdgeLeft(diffs).join(""),
    right : diffEdgeRight(diffs).join("")
  }
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
    var edges = getEdges(value, head)

    // Update edges
    if(left === undefined && right === undefined){
      left = edges.left
      right = edges.right
    }

    // break
    if(left !== edges.left){
      if(right === "" && edges.left === ""){
        breakpoint = i
        return
      }
      left = edges.left
    }
    if(right !== edges.right){
      if(left === "" && edges.right === ""){
        breakpoint = i
        return
      }
      right = edges.right
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
