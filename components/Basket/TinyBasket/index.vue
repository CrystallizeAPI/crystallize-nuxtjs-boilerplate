<template>
  <div class="basket-tiny">
    <h4 class="basket-tiny__title">[Basket]</h4>
    <div class="basket-tiny__content">
      content
    </div>
    <footer class="basket-tiny__footer">
      <NuxtLink class="basket-tiny__link-to-checkout" disabled to="/checkout">
        Go to checkout
      </NuxtLink>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLinkToCheckoutActive: function () {
      return this.$store.getters["cart/totalWithoutDiscounts"].quantity > 0;
    },
  },
};
</script>

<style scoped src='./index.css'></style>