<template>
  <div class="basket-tiny">
    <h4 class="basket-tiny__title">
      {{ $t("basket.title") }}
    </h4>
    <div class="basket-tiny__content">{{ this.cart.length }}</div>
    <footer class="basket-tiny__footer">
      <NuxtLink
        class="basket-tiny__link-to-checkout"
        :disabled="!isLinkToCheckoutActive"
        :event="isLinkToCheckoutActive ? 'click' : ''"
        to="/checkout"
      >
        {{ $t("basket.goToCheckout") }}
      </NuxtLink>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLinkToCheckoutActive: function () {
      return (
        this.$store.getters["basket/totalItemsWithoutDiscount"].quantity > 0
      );
    },
    cart: function () {
      return this.$store.state.basket.serverBasket?.cart || [];
    },
  },
};
</script>

<style scoped src='./index.css'></style>