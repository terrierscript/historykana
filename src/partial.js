import compactDiff from "compact-diff"

var isChanged = function(diff){
  return (diff.added || diff.removed)
}

var getSameValue = function(diffs){
  var sameValues = []
  for(var i = 0; i < diffs.length; i++){
    var diff = diffs[i]
    if(isChanged(diff)){
      break
    }
    sameValues.push(diff)
  }
  return sameValues.map(function(same){
    return same.value
  })
}

// reverse sameValue
var getSameValueFromRight = function(diffs){
  return getSameValue(diffs.concat().reverse()).reverse()
}

var getEdges = function(value1, value2){
  var diffs = compactDiff(value1, value2)
  return {
    left : getSameValue(diffs).join(""),
    right : getSameValueFromRight(diffs).join("")
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
    if(value === ""){
      breakpoint = i + 1
      return
    }
    var edges = getEdges(value, head)

    // initial edges
    if(left === undefined && right === undefined){
      left = edges.left
      right = edges.right
      return
    }

    // check left & update
    if(left !== edges.left && right === "" && edges.left === ""){
      breakpoint = i
      return
    }
    left = edges.left

    // check right & update
    if(right !== edges.right && left === "" && edges.right === ""){
      breakpoint = i
      return
    }
    right = edges.right
  })

  return {
    breakpoint : breakpoint,
    left : left,
    right : right
  }
}

var cleaning = function(array, left, right){
  return array.map(function(value){
    var reg = new RegExp("^" + left + "(.*)" + right + "$")
    return value.replace(reg, "$1")
  })
}

var split = function(array, breakpoint){
  var left = array.concat() // deep copy
  var right = left.splice(0, breakpoint - 1)
  return {
    left : left,
    right : right
  }
}

var partializeRecursive = function(array){
  var breaks = getBreakPoint(array)
  // recursive edge
  if(breaks.breakpoint === -1){
    if(array[0] === ""){
      return []
    }
    return [array]
  }

  // recursive
  var splited = split(array, breaks.breakpoint)

  var left = splited.left
  var cleaned = cleaning(splited.right, breaks.left, breaks.right)

  var leftRecursive = partializeRecursive(left)
  var cleanedRecursive = partializeRecursive(cleaned)

  if(breaks.left !== ""){
    return leftRecursive.concat(cleanedRecursive)
  }else{
    return cleanedRecursive.concat(leftRecursive)
  }
}

export default function(array){
  return partializeRecursive(array.concat().reverse())
}
