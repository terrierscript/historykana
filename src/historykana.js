import partialize from './partial'
import extend from 'extend'
import typeOf from "just-typeof"

export class HistoryKana {
  constructor (options) {
    const defaults = {
      kanaRegexp: '^[ 　ぁあ-んー]*$'
    }

    this.options = extend({}, defaults, options)
    let regExp = this.options.kanaRegexp
    if (typeOf(regExp) !== "regexp") {
      regExp = new RegExp(regExp)
    }
    this.kanaRegexp = regExp
  }
  execute (histories) {
    histories = this.shrink(histories)
    const partialized = partialize(histories)
    const kana = this.extractKana(partialized)
    return kana.join('')
  }
  extractKana (partialized) {
    return partialized.map((group) => {
      const kanas = group.filter((value) => {
        return this.isKana(value)
      })
      return kanas.reduce((result, kana) => {
        if (this.isSameKana(result, kana)) {
          return kana
        }
        return result
      }, kanas[0])
    })
  }
  isKana (str) {
    str = str || ''
    return this.kanaRegexp.test(str)
  }
  // を === お
  isSameKana (str1, str2) {
    if (!this.isKana(str1)) {
      return false
    }
    if (!this.isKana(str2)) {
      return false
    }
    return str1.replace('を', 'お') === str2.replace('を', 'お')
  }
  // remove concurrent same value.
  shrink (histories) {
    return histories.reduce((result, value) => {
      const last = result[result.length - 1]
      if (last === undefined || last !== value) {
        result.push(value)
      }
      return result
    }, [])
  }
}
