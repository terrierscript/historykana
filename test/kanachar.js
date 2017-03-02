const assert = require('assert')
const HistoryKana = require('../lib/historykana').HistoryKana

const hKana = new HistoryKana()
const kanachar = function (str) {
  return hKana.isKana(str)
}

describe('hiragana', function () {
  describe('is_hiragana', function () {
    it('noaml', function () {
      assert.equal(true, kanachar('あいう'))
    })
    it('kanji', function () {
      assert.equal(false, kanachar('山田'))
    })
    it('kanji + hiragana', function () {
      assert.equal(false, kanachar('山田たろう'))
    })
    it('ー', function () {
      assert.equal(true, kanachar('すーぱー'))
    })
    it('with space', function () {
      assert.equal(true, kanachar('やまだ　たろう'))
    })
    it('with harf space', function () {
      assert.equal(true, kanachar('やまだ たろう'))
    })
  })
})
