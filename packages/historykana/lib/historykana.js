'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryKana = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _partial = require('./partial');

var _partial2 = _interopRequireDefault(_partial);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HistoryKana = exports.HistoryKana = function () {
  function HistoryKana(options) {
    _classCallCheck(this, HistoryKana);

    var defaults = {
      kanaRegexp: '^[ 　ぁあ-んー]*$'
    };

    this.options = (0, _extend2.default)({}, defaults, options);
    var regExp = this.options.kanaRegexp;
    if (!_util2.default.isRegExp(regExp)) {
      regExp = new RegExp(regExp);
    }
    this.kanaRegexp = regExp;
  }

  _createClass(HistoryKana, [{
    key: 'execute',
    value: function execute(histories) {
      histories = this.shrink(histories);
      var partialized = (0, _partial2.default)(histories);
      var kana = this.extractKana(partialized);
      return kana.join('');
    }
  }, {
    key: 'extractKana',
    value: function extractKana(partialized) {
      var _this = this;

      return partialized.map(function (group) {
        var kanas = group.filter(function (value) {
          return _this.isKana(value);
        });
        return kanas.reduce(function (result, kana) {
          if (_this.isSameKana(result, kana)) {
            return kana;
          }
          return result;
        }, kanas[0]);
      });
    }
  }, {
    key: 'isKana',
    value: function isKana(str) {
      str = str || '';
      return this.kanaRegexp.test(str);
    }
    // を === お

  }, {
    key: 'isSameKana',
    value: function isSameKana(str1, str2) {
      if (!this.isKana(str1)) {
        return false;
      }
      if (!this.isKana(str2)) {
        return false;
      }
      return str1.replace('を', 'お') === str2.replace('を', 'お');
    }
    // remove concurrent same value.

  }, {
    key: 'shrink',
    value: function shrink(histories) {
      return histories.reduce(function (result, value) {
        var last = result[result.length - 1];
        if (last === undefined || last !== value) {
          result.push(value);
        }
        return result;
      }, []);
    }
  }]);

  return HistoryKana;
}();