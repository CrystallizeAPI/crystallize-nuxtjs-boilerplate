<template>
  <span class="discount-tag"> - {{ discount }}% </span>
</template>

<script>
export default {
  props: {
    discount: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped src='./index.css'></style>