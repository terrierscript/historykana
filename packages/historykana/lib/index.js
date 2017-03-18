'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (histories, options) {
  var kana = new _historykana.HistoryKana(options);
  return kana.execute(histories);
};

var _historykana = require('./historykana');