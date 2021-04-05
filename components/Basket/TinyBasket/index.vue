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
            :sku="item.sku"
            :path="item.path"
            :name="item.name"
            :image="item.images[0]"
            :quantity="item.quantity"
            :price="item.price"
          />
        </li>
      </ul>
      <div class="tiny-basket__payment-details">
        <div class="tiny-basket__payment-total">
          <span>{{ $t("basket.totalPrice") }}</span>
          <span>1000</span>
        </div>
        <div class="tiny-basket__payment-tax">
          <span>{{ $t("basket.tax") }}</span>
          <span>1000</span>
        </div>
        <div class="tiny-basket__payment-to-pay">
          <span>{{ $t("basket.totalToPay") }}</span>
          <span>1000</span>
        </div>
      </div>
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
      return this.$store.state.basket.serverBasket?.cart || [];
    },
  },
};
</script>

<style scoped src='./index.css'></style>