# historykana
> Get Japanese *Furigana* From Input

[![Circle CI](https://circleci.com/gh/suisho/historykana.svg?style=svg)](https://circleci.com/gh/suisho/historykana)

# Usage

```
var historykana = require("historykana")

// Stock input history
var inputHistory = ["ｙ","や","やｍ","やま","やまｄ","やまだ","山田","山田","山田ｔ","山田た","山田たｒ","山田たろ","山田たろう","山田太郎","山田太郎"]

var historykana(inputHistory)
// => やまだたろう
```