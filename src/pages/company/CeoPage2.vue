<template>
  <q-page class="system-page" padding>
    <div class="q-pl-md">
      <h1 class="text-h4 text-weight-bold">Quasar + vee-validate v4</h1>
      <div class="q-mt-md q-gutter-md" style="max-width: 300px">
        <ValidationForm @submit="onSubmit" ref="test">
          <Field
            name="email"
            rules="required|email"
            v-model="email"
            :validate-on-blur="false"
            v-slot="{ errorMessage, value, field }"
          >
            <system-input
              :label="t('email')"
              placeholder="user@example.com"
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            />
          </Field>
          <Field
            name="username"
            rules="required"
            v-model="email2"
            :validate-on-blur="false"
            v-slot="{ errorMessage, value, field }"
          >
            <system-input
              :label="t('username')"
              placeholder="user@example.com"
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            />
          </Field>
          <div class="q-gutter-sm"></div>
          <q-btn class="q-mt-md" color="primary" type="submit" label="Submit" />
        </ValidationForm>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Field, Form as ValidationForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "App",
  components: {
    Field,
    ValidationForm,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const test = ref(null);
    const email = ref(null);
    const email2 = ref(null);

    function onSubmit(values, actions) {
      console.log(JSON.stringify(values, null, 2));
      actions.resetForm();
    }

    return {
      t,
      onSubmit,
      test,
      email,
      email2,
    };
  },
};
</script>
