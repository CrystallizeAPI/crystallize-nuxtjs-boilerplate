<template>
  <div class="list-format-folder">
    <h3 class="list-format-folder__title">{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped src='./index.css'></style>