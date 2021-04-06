<template>
  <div class="checkout-page-basket">
    <div class="checkout-page-basket__content">
      <Totals />
    </div>
  </div>
</template>

<script>
import BasketItem from "./Item";
import Totals from "../../../components/Totals";

export default {
  components: { Totals, BasketItem },
  computed: {
    isLinkToCheckoutActive() {
      return (
        this.$store.getters["basket/totalItemsWithoutDiscount"].quantity > 0
      );
    },
    cart() {
      return this.$store.state.basket.serverBasket?.cart || [];
    },
  },
};
</script>

<style scoped src='./index.css'></style>