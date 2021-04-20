<template>
  <div class="facet-group">
    <h4 class="facet-group__header">
      <span class="facet-group__title">{{ title }}</span>
      <slot name="action" />
    </h4>
    <slot name="children" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped src='./index.css'></style>