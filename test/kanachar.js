var HistoryKana = require("../index").HistoryKana
var hKana = new HistoryKana()
var kanachar = function(str){
  return hKana.isKana(str)
}

var assert = require("power-assert")
console.log(kanachar)
describe("hiragana", function(){
  describe("is_hiragana", function(){
    it("noraml", function(){
      assert.equal(true, kanachar("あいう"))
    })
    it("kanji", function(){
      assert.equal(false, kanachar("山田"))
    })
    it("kanji + hiragana", function(){
      assert.equal(false, kanachar("山田たろう"))
    })
    it("ー", function(){
      assert.equal(true, kanachar("すーぱー"))
    })
    it("with space", function(){
      assert.equal(true, kanachar("やまだ　たろう"))
    })
    it("with harf space", function(){
      assert.equal(true, kanachar("やまだ たろう"))
    })
  })
})