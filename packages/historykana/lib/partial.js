'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (array) {
  return partializeRecursive(array.concat().reverse());
};

var _compactDiff = require('compact-diff');

var _compactDiff2 = _interopRequireDefault(_compactDiff);

var _regexp = require('regexp.escape');

var _regexp2 = _interopRequireDefault(_regexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isChanged = function isChanged(diff) {
  return diff.added || diff.removed;
};

var getSameValue = function getSameValue(diffs) {
  var sameValues = [];
  for (var i = 0; i < diffs.length; i++) {
    var diff = diffs[i];
    if (isChanged(diff)) {
      break;
    }
    sameValues.push(diff);
  }
  return sameValues.map(function (same) {
    return same.value;
  });
};

// reverse sameValue
var getSameValueFromRight = function getSameValueFromRight(diffs) {
  return getSameValue(diffs.concat().reverse()).reverse();
};

var getEdges = function getEdges(value1, value2) {
  var diffs = (0, _compactDiff2.default)(value1, value2);
  return {
    left: getSameValue(diffs).join(''),
    right: getSameValueFromRight(diffs).join('')
  };
};

var getBreakPoint = function getBreakPoint(array) {
  var head = array[0];
  var left = void 0,
      right = void 0;
  var breakpoint = -1;
  // detect breakpoint
  array.forEach(function (value, i) {
    if (!array[i + 1] || head === value || breakpoint > -1) {
      return;
    }
    if (value === '') {
      breakpoint = i + 1;
      return;
    }
    var edges = getEdges(value, head);

    // initial edges
    if (left === undefined && right === undefined) {
      left = edges.left;
      right = edges.right;
      return;
    }

    // check left & update
    if (left !== edges.left && right === '' && edges.left === '') {
      breakpoint = i;
      return;
    }
    left = edges.left;

    // check right & update
    if (right !== edges.right && left === '' && edges.right === '') {
      breakpoint = i;
      return;
    }
    right = edges.right;
  });

  return {
    breakpoint: breakpoint,
    left: left,
    right: right
  };
};

var cleaning = function cleaning(array, left, right) {
  var _left = (0, _regexp2.default)(left);
  var _right = (0, _regexp2.default)(right);
  return array.map(function (value) {
    var reg = new RegExp('^' + _left + '(.*)' + _right + '$');
    return value.replace(reg, '$1');
  });
};

var split = function split(array, breakpoint) {
  var left = array.concat(); // deep copy
  var right = left.splice(0, breakpoint - 1);
  return {
    left: left,
    right: right
  };
};

var partializeRecursive = function partializeRecursive(array) {
  var breaks = getBreakPoint(array);
  // recursive edge
  if (breaks.breakpoint === -1) {
    if (array[0] === '') {
      return [];
    }
    return [array];
  }

  // recursive
  var splited = split(array, breaks.breakpoint);

  var left = splited.left;
  var cleaned = cleaning(splited.right, breaks.left, breaks.right);

  var leftRecursive = partializeRecursive(left);
  var cleanedRecursive = partializeRecursive(cleaned);

  if (breaks.left !== '') {
    return leftRecursive.concat(cleanedRecursive);
  } else {
    return cleanedRecursive.concat(leftRecursive);
  }
};