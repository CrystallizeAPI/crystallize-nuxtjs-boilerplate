<template>
  <div class="checkout-page__section">
    <h3 class="checkout-page__section-title">{{ title }}</h3>
    <slot />
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