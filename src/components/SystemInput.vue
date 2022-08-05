<template>
  <span>
    <external-label
      v-if="externalLabel"
      :label="externalLabel"
      :required="rules.includes('required')"
    />
    <q-input
      :type="isPassword && isPwd ? 'password' : 'text'"
      v-model="componentValue"
      v-bind="$attrs"
    >
      <template v-if="isPassword" v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
          size="sm"
          color="system-caption"
        />
      </template>
      <!--      <template v-slot:append="scope"><slot name="append" v-bind="scope"/></template>-->
      <!--      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>-->
    </q-input>
  </span>
</template>

<script>
import { ref, watch } from "vue";
import ExternalLabel from "src/components/ExternalLabel.vue";

export default {
  components: { ExternalLabel },
  inheritAttrs: false,
  name: "SystemInput",
  //------------------------------------------------------Props
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },
    externalLabel: {
      type: String,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    // must be included in props
    modelValue: {
      type: null,
    },
  },

  setup(props, { emit }) {
    // getting parent initial value
    let componentValue = ref(props.modelValue);
    let isPwd = ref(true);

    // watching value of a reactive object (watching a getter)
    // getting external changes
    watch(
      () => props.modelValue,
      (newValue) => {
        componentValue.value = newValue;
      }
    );
    // directly watching a ref
    // passing internal changes
    watch(componentValue, (newValue) => {
      if (componentValue.value !== props.modelValue) {
        emit("update:modelValue", newValue);
      }
    });

    return {
      componentValue,
      isPwd,
    };
  },
};
</script>
