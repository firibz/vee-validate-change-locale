<template>
  <q-page class="system-page" padding>
    <div class="q-pl-md">
      <h1 class="text-h4 text-weight-bold">Quasar + vee-validate v4</h1>
      <div class="q-mt-md q-gutter-md" style="max-width: 300px">
        <ValidationForm @submit="onSubmit" ref="test">
          <Field
            v-model="email"
            rules="required|email"
            name="email"
            v-slot="{ errorMessage, value, handleChange }"
          >
            <q-input
              label="q-input"
              placeholder="type sth & press enter to see the bug"
              :model-value="value"
              @update:model-value="handleChange"
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

    function onSubmit(values, actions) {
      console.log(JSON.stringify(values, null, 2));
      actions.resetForm();
    }

    return {
      t,
      test,
      email,
      onSubmit,
    };
  },
};
</script>
