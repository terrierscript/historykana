"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var partialize = require("./partial");
var extend = require("extend");
var util = require("util");

var HistoryKana = (function () {
  function HistoryKana(options) {
    _classCallCheck(this, HistoryKana);

    var defaults = {
      kanaRegexp: "^[ 　ぁあ-んー]*$"
    };

    this.options = extend({}, defaults, options);
    var regExp = this.options.kanaRegexp;
    if (!util.isRegExp(regExp)) {
      regExp = new RegExp(regExp);
    }
    this.kanaRegexp = regExp;
  }

  _createClass(HistoryKana, [{
    key: "execute",
    value: function execute(histories) {
      histories = this.shrink(histories);
      var partialized = partialize(histories);
      var kana = this.extractKana(partialized);
      return kana.join("");
    }
  }, {
    key: "extractKana",
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
    key: "isKana",
    value: function isKana(str) {
      str = str || "";
      return this.kanaRegexp.test(str);
    }
  }, {
    key: "isSameKana",

    // を === お
    value: function isSameKana(str1, str2) {
      if (!this.isKana(str1)) {
        return false;
      }
      if (!this.isKana(str2)) {
        return false;
      }
      return str1.replace("を", "お") === str2.replace("を", "お");
    }
  }, {
    key: "shrink",

    // remove concurrent same value.
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
})();

exports.HistoryKana = HistoryKana;