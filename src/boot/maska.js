import { boot } from 'quasar/wrappers'
import { toEnglishNumbers } from 'src/converts/ConvertToEnglish'

import { maska, tokens } from 'maska'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  tokens['#'] = {
    pattern: /[\u06F0-\u06F90-9]/,
    transform: function (v) {
      return toEnglishNumbers(v)
    }
  }
  app.directive('maska', maska)
})
