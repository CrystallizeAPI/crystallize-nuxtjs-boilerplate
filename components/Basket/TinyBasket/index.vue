<template>
  <div class="tiny-basket">
    <h4 class="tiny-basket__title">
      {{ $t("basket.title") }}
    </h4>
    <div class="tiny-basket__content">
      <span v-if="cart.length === 0">{{ $t("basket.empty") }}</span>
      <ul class="tiny-basket__list" v-else>
        <li class="tiny-basket__list-item" v-for="item in cart">
          <BasketItem
            :key="item.sku"
            :sku="item.sku"
            :path="item.path"
            :name="item.name"
            :image="item.images[0]"
            :quantity="item.quantity"
            :price="item.price"
            :attributes="item.attributes"
          />
        </li>
      </ul>
      <Spinner v-if="isLoading" />
      <div v-else class="tiny-basket__payment-details">
        <PaymentInfo :label="$t('basket.totalPrice')" :amount="totalPrice" />
        <PaymentInfo :label="$t('basket.tax')" :amount="taxAmount" />
        <PaymentInfo
          :label="$t('basket.totalToPay')"
          :amount="totalAmountToPay"
        />
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
import PaymentInfo from "./PaymentInfo";
import { formatCurrency } from "/lib/pricing";
import { BASKET_STATUS } from "/store/basket/state";

export default {
  components: { BasketItem, PaymentInfo },
  computed: {
    isLinkToCheckoutActive() {
      return (
        this.$store.getters["basket/totalItemsWithoutDiscount"].quantity > 0
      );
    },
    isLoading() {
      return (
        this.$store.state.basket.status === BASKET_STATUS.SERVER_BASKET_IS_STALE
      );
    },
    cart() {
      return this.$store.state.basket.serverBasket?.cart || [];
    },
    totalPrice() {
      const currency = this.$store.state.basket.serverBasket?.total.currency;
      return this.formatPrice({
        amount: this.$store.getters["basket/totalItemsWithoutDiscount"].gross,
        currency,
      });
    },
    taxAmount() {
      const total = this.$store.state.basket.serverBasket?.total || {};
      const taxAmount = total.gross - total.net;
      const currency = this.$store.state.basket.serverBasket?.total.currency;

      return this.formatPrice({
        amount: parseInt(taxAmount * 100, 10) / 100,
        currency,
      });
    },
    totalAmountToPay() {
      const total = this.$store.state.basket.serverBasket?.total || {};
      const currency = this.$store.state.basket.serverBasket?.total.currency;

      return this.formatPrice({
        amount: total.gross,
        currency,
      });
    },
  },
  methods: {
    formatPrice({ amount, currency = "EUR" }) {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      return formatCurrency({ amount, currency, locale });
    },
  },
};
</script>

<style scoped src='./index.css'></style>