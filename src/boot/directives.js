import { boot } from 'quasar/wrappers'
import { toEnglishNumbersDirective, toOnlyEnglishNumbersDirective } from 'vue-persian-numbers-directive/src/vue-persian-numbers-directive'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // use as v-english-numbers
  app.directive('englishNumbers', toEnglishNumbersDirective)
  // use as v-only-english-numbers
  app.directive('onlyEnglishNumbers', toOnlyEnglishNumbersDirective)
})
