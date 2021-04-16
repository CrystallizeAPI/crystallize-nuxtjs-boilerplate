<template>
  <NuxtLink :to="data.path" class="list-format-folder">
    <h3 class="list-format-folder__title">{{ data.name }}</h3>
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