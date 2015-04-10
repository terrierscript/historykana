"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HistoryKana = require("./historykana");

exports["default"] = function (histories, options) {
  console.log(_HistoryKana.HistoryKana);
  var kana = new _HistoryKana.HistoryKana(options);
  return kana.execute(histories);
};

module.exports = exports["default"];