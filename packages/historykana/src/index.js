import { HistoryKana } from './historykana'

export default function (histories, options) {
  const kana = new HistoryKana(options)
  return kana.execute(histories)
}
