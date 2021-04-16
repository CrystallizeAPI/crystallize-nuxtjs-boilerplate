<template>
  <div class="cart">
    <span v-if="cart.length === 0">{{ $t("basket.empty") }}</span>
    <ul class="cart__list" v-else>
      <li class="cart__item" v-for="item in cart">
        <CartItem :key="item.sku" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import CartItem from "./Item";
export default {
  components: { CartItem },
  computed: {
    cart() {
      return this.$store.state.basket.serverBasket?.cart || [];
    },
  },
};
</script>

<style scoped src='./index.css'></style>