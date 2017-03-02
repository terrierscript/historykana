import compactDiff from 'compact-diff'
import escape from 'regexp.escape'

const isChanged = function (diff) {
  return (diff.added || diff.removed)
}

const getSameValue = function (diffs) {
  const sameValues = []
  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i]
    if (isChanged(diff)) {
      break
    }
    sameValues.push(diff)
  }
  return sameValues.map(function (same) {
    return same.value
  })
}

// reverse sameValue
const getSameValueFromRight = function (diffs) {
  return getSameValue(diffs.concat().reverse()).reverse()
}

const getEdges = function (value1, value2) {
  const diffs = compactDiff(value1, value2)
  return {
    left: getSameValue(diffs).join(''),
    right: getSameValueFromRight(diffs).join('')
  }
}

const getBreakPoint = function (array) {
  const head = array[0]
  let left, right
  let breakpoint = -1
  // detect breakpoint
  array.forEach(function (value, i) {
    if (!array[i + 1] || head === value || breakpoint > -1) {
      return
    }
    if (value === '') {
      breakpoint = i + 1
      return
    }
    const edges = getEdges(value, head)

    // initial edges
    if (left === undefined && right === undefined) {
      left = edges.left
      right = edges.right
      return
    }

    // check left & update
    if (left !== edges.left && right === '' && edges.left === '') {
      breakpoint = i
      return
    }
    left = edges.left

    // check right & update
    if (right !== edges.right && left === '' && edges.right === '') {
      breakpoint = i
      return
    }
    right = edges.right
  })

  return {
    breakpoint: breakpoint,
    left: left,
    right: right
  }
}

const cleaning = function (array, left, right) {
  const _left = escape(left)
  const _right = escape(right)
  return array.map(function (value) {
    const reg = new RegExp(`^${_left}(.*)${_right}$`)
    return value.replace(reg, '$1')
  })
}

const split = function (array, breakpoint) {
  const left = array.concat() // deep copy
  const right = left.splice(0, breakpoint - 1)
  return {
    left: left,
    right: right
  }
}

var partializeRecursive = function (array) {
  const breaks = getBreakPoint(array)
  // recursive edge
  if (breaks.breakpoint === -1) {
    if (array[0] === '') {
      return []
    }
    return [array]
  }

  // recursive
  const splited = split(array, breaks.breakpoint)

  const left = splited.left
  const cleaned = cleaning(splited.right, breaks.left, breaks.right)

  const leftRecursive = partializeRecursive(left)
  const cleanedRecursive = partializeRecursive(cleaned)

  if (breaks.left !== '') {
    return leftRecursive.concat(cleanedRecursive)
  } else {
    return cleanedRecursive.concat(leftRecursive)
  }
}

export default function (array) {
  return partializeRecursive(array.concat().reverse())
}
