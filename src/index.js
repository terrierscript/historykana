import { HistoryKana } from "./historykana"

let historykana = function(histories, options){
  var kana = new HistoryKana(options)
  return kana.execute(histories)
}

// export default historykana
module.export = historykana