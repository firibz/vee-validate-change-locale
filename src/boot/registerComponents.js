import { boot } from "quasar/wrappers";

import SystemInput from "components/SystemInput.vue";

export default boot(async ({ app }) => {
  app.component("SystemInput", SystemInput);
});
