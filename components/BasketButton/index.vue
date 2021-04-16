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
import { lockScroll, unlockScroll } from "/lib/layout";

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
      this.$store.dispatch("layout/toggleAside").then(() => {
        this.$store.state.layout.isAsideShown ? lockScroll() : unlockScroll();
      });
    },
  },
};
</script>

<style scoped src='./index.css'></style>