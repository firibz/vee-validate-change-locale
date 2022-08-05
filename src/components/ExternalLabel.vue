<template>
  <div class="full-width">
    <span class="text-system-primary text-bold q-pl-sm">{{ label }}</span>
    <span class="text-system-negative">{{ required ? ' *' : '' }}</span>
    <!--    <span class="text-system-primary q-pl-md">{{extraLabel? '('+ extraLabel + ')':''}}</span>-->
  </div>
</template>

<script>
export default {
  name: "ExternalLabel",
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
    // extraLabel: {
    //   type: String,
    // }
  }
}
</script>
