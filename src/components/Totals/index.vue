<template>
  <div>
    <Spinner v-if="isLoading" />
    <div v-else>
      <TotalInfo :label="$t('basket.totalPrice')" :amount="totalPrice" />
      <TotalInfo :label="$t('basket.tax')" :amount="taxAmount" />
      <TotalInfo :label="$t('basket.totalToPay')" :amount="totalAmountToPay" />
    </div>
  </div>
</template>

<script>
import TotalInfo from "./TotalInfo";
import { formatCurrency } from "/lib/pricing";
import { BASKET_STATUS } from "../../store/basket/state";

export default {
  components: { TotalInfo },
  computed: {
    isLoading() {
      return (
        this.$store.state.basket.status === BASKET_STATUS.SERVER_BASKET_IS_STALE
      );
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
