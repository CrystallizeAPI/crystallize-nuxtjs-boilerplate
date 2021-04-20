<template>
  <NuxtLink :to="data.path" class="micro-format-folder">
    <h3 class="micro-format-folder__title">{{ data.name }}</h3>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped src='./index.css'></style>