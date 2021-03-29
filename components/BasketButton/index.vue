<template>
  <div class="basket-button">
    <IconButton screenReaderText="basket" iconSrc="/icons/basket.svg" />
    <span class="basket-button__badge">{{ cartItems }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems: function () {
      return this.$store.getters["cart/totalWithoutDiscounts"].quantity || 0;
    },
  },
};
</script>

<style scoped src='./index.css'></style>