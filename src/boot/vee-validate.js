import { boot } from "quasar/wrappers";
import { defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import fa from "@vee-validate/i18n/dist/locale/fa.json";
import en from "@vee-validate/i18n/dist/locale/en.json";
import { i18n } from "boot/i18n";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  defineRule("required", required);
  defineRule("email", email);
  defineRule("test", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    // Check if email
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
      return i18n.global.t(`messages.success`);
    }

    return true;
  });

  // Activate the locale
  // configure({
  //   generateMessage: localize({fa})
  // });
  configure({
    generateMessage: localize({
      en: {
        messages: en.messages,
        names: i18n.global.messages.value["en-US"],
      },
      fa: {
        messages: fa.messages,
        names: i18n.global.messages.value["fa-IR"],
      },
    }),
  });
});
