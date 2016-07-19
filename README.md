# HistoryKana
Get Japanese ***Furigana*** from input history

[![Circle CI](https://circleci.com/gh/inuscript/historykana.svg?style=svg)](https://circleci.com/gh/inuscript/historykana)

# Usage

```
var historykana = require("historykana")

// Stock input history
var inputHistory = ["ｙ","や","やｍ","やま","やまｄ","やまだ","山田","山田","山田ｔ","山田た","山田たｒ","山田たろ","山田たろう","山田太郎","山田太郎"]

var historykana(inputHistory)
// => やまだたろう

```

# API
## `historykana(inputHistories, options)`
- `inputHistories` (Required)
  - Input History Array
- `options`
  - Option object.

## Options
### `kanaRegexp` (=`"^[ 　ぁあ-んー]*$"`)
Hiragana detection regular expression rule.

