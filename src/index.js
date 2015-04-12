import { HistoryKana } from "./historykana"

export default function(histories, options){
  console.log(HistoryKana)
  var kana = new HistoryKana(options)
  return kana.execute(histories)
}
