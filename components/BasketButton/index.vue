<template>
  <div class="basket-button">
    <IconButton
      @click="toggleAside"
      screenReaderText="basket"
      iconSrc="/icons/basket.svg"
    />
    <span class="basket-button__badge">{{ cartItems }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems: function () {
      return (
        this.$store.getters["basket/totalItemsWithoutDiscount"].quantity || 0
      );
    },
  },
  methods: {
    toggleAside() {
      this.$store.dispatch("layout/toggleAside");
    },
  },
};
</script>

<style scoped src='./index.css'></style>