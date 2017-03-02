var assert = require("assert")
var historykana = require("../index")
// var todo = process.env.CI ? it.skip : it
var stepTest = function(steps, kana){
  var result = historykana(steps)
  assert.equal(kana, result)
}
describe("historykana", function(){
  describe("simple", function(){
    it("ｙ -> や", function(){
      var steps = ["ｙ", "や"]
      stepTest(steps, "や")
    })
    it("やｍ -> やま", function(){
      var steps = ["ｙ", "や", "やｍ", "やま"]
      stepTest(steps, "やま")
    })
    it("やま -> やまｄ", function(){
      var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ"]
      stepTest(steps, "やま")
    })
    it("まりお -> 鞠男 -> 毬男", function(){
      var steps = ["まりお", "鞠男", "毬男"]
      stepTest(steps, "まりお")
    })
    it("not お -> を", function(){
      var steps = ["まりお", "まりを", "鞠男", "毬男"]
      stepTest(steps, "まりお")
    })
    it("not お -> を part2", function(){
      var steps = ["まりお", "鞠男", "まりを", "毬男"]
      stepTest(steps, "まりお")
    })
  })
  describe("scenario", function(){

    it("Dokaben scenario", function(){
      var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山田ｔ", "山田た", "山田たｒ", "山田たろ", "山田たろう", "山田太郎", "山田太郎"]
      stepTest(steps, "やまだたろう")
    })
    it("Yamada Removed scenario", function(){
      var steps = ["ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山", "山ｄ", "山だ", "山田", "山田", "山田ｔ", "山田た", "山田た"]
      stepTest(steps, "やまだた")
    })
    it("SuperMario1 scenario", function(){
      var steps = ["ｓ", "す", "すｈ", "すは", "酢派", "酢破", "素破",
      "素破ｍ", "素破ま", "素破まｒ", "素破まり",
      "素破まりお", "素破真理雄"
     , "素破万里緒",
      "素破毬男", "素破マリヲ", "素破鞠男"
      ]
      stepTest(steps, "すはまりお")
    })
    it("SuperMario2 scenario", function(){
      var steps = [
      "まりお", "真理雄", "まりを", "万里緒",
      "毬男", "鞠男"]
      stepTest(steps, "まりお")
    })
    it("SuperMario3 scenario", function(){
      var steps = ["ｍ", "ま", "まｒ", "まり", "まりお", "真理夫", "万里夫", "真理雄", "マリヲ"]//, "万里緒"]
      stepTest(steps, "まりお")
    })
    it("Same Kanji scenario", function(){
      var steps = ["う", "うｂ", "うぶ", "初", "生", "生ｎ", "生な", "生なｍ", "生なま", "生生", "生生", "生生ｓ", "生生せ", "生生せい", "生生生", "生生生"]
      stepTest(steps, "うぶなませい")
    })
    it("Same Kanji scenario", function(){
      var steps = ["ｎ", "な", "なｍ", "なま", "生", "生う", "生うｂ", "生うぶ", "生生"]
      // console.log(historykana(steps))
      stepTest(steps, "なまうぶ")
    })
    it.skip("first insert Same Kanji scenario", function(){
      var steps = ["", "ｎ", "な", "なｍ", "なま", "生", "生う", "生うｂ", "生うぶ", "生生", "ｓ生生", "せ生生", "せい生生", "生生生"]
      // console.log(historykana(steps))
      stepTest(steps, "せいなまうぶ")
    })
    it("Signal pattern", function(){
      var steps = ["", "あ", "あｋ", "あか", "赤", "赤あ", "赤あお", "赤青", "赤ｋ青", "赤き青", "赤きい青", "赤きいｒ青", "赤きいろ青", "赤黄色青"]
      // console.log(historykana(steps))
      stepTest(steps, "あかきいろあお")
    })
    it("Signal pattern2", function(){
      var steps = ["", "あ", "あｋ", "あか", "赤", "あ赤", "あお赤", "青赤", "青赤ｋ", "青赤き", "青赤きい", "青赤きいｒ", "青赤きいろ", "青赤黄色"]
      // console.log(historykana(steps))
      stepTest(steps, "あおあかきいろ")
    })
    it("Mobile Convert", function(){
      // In mobile app. input by char
      var steps = ["や", "やま", "やまた", "やまだ", "山田"]
      stepTest(steps, "やまだ")
    })
    it("remove tarou", function(){
      var steps = [ "ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山田ｔ", "山田た", "山田たｒ", "山田たろ", "山田たろう", "山田太郎", "山田太郎", "山田太", "山田" ]
      stepTest(steps, "やまだ")
    })
    it("remove and add", function(){
      var steps = [ "ｙ", "や", "やｍ", "やま", "やまｄ", "やまだ", "山田", "山田", "山田ｔ", "山田た", "山田たｒ", "山田たろ", "山田たろう", "山田太郎", "山田太郎", "山田太", "山田", "山田ｇ", "山田ご", "山田ごｒ", "山田ごろ", "山田ごろう", "山田五郎", "山田五郎"]
      stepTest(steps, "やまだごろう")
    })
    it("mobile input", function(){
      var steps = ["", "や", "ゆ"]
      stepTest(steps, "ゆ")
    })
    it("espcae regexp character", function(){
      var steps = [ "ｙ", "や", "やｍ", "やま", "山+" ]
      stepTest(steps, "やま")
    })
  })
})
