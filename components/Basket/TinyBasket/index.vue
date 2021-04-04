<template>
  <div class="tiny-basket">
    <h4 class="tiny-basket__title">
      {{ $t("basket.title") }}
    </h4>
    <div class="tiny-basket__content">
      <span v-if="cart.length === 0">{{ $t("basket.empty") }}</span>
      <ul class="tiny-basket__list" v-else v-for="item in cart">
        <li class="tiny-basket__list-item" :key="item.sku">
          <BasketItem
            :name="item.name"
            :quantity="item.quantity"
            :price="item.price"
          />
        </li>
      </ul>
    </div>
    <footer class="tiny-basket__footer">
      <NuxtLink
        class="tiny-basket__link-to-checkout"
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
import BasketItem from "./Item";

export default {
  components: { BasketItem },
  computed: {
    isLinkToCheckoutActive() {
      return (
        this.$store.getters["basket/totalItemsWithoutDiscount"].quantity > 0
      );
    },
    cart() {
      console.log(this.$store.state.basket.serverBasket?.cart);
      return this.$store.state.basket.serverBasket?.cart || [];
    },
  },
};
</script>

<style scoped src='./index.css'></style>