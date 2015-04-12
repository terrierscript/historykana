import { HistoryKana } from "./historykana"

export default function(histories, options){
  var kana = new HistoryKana(options)
  return kana.execute(histories)
}
