<template>
  <div class="price" :class="discountPercentage ? 'price--with-discount' : ''">
    <div v-if="discountPercentage" class="price__discount-percentage">
      <DiscountTag :discount="discountPercentage" />
    </div>
    <div v-if="discountPrice" class="price__details">
      <!-- Price with discount-->
      <strong>{{ discountPrice }}</strong>
      <!-- Original Price-->
      <div class="price__old-price">{{ defaultPrice }}</div>
    </div>
    <div v-else class="price__details">
      <!-- Original Price-->
      <strong>{{ defaultPrice }}</strong>
    </div>
  </div>
</template>

<script>
import { getRelativePriceVariants, formatCurrency } from "/lib/pricing";
export default {
  props: {
    variant: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    const { defaultPrice, discountPrice, discountPercentage } = this.getPricing(
      this.variant
    );

    return {
      defaultPrice,
      discountPrice,
      discountPercentage,
    };
  },
  watch: {
    variant: function (newVariant) {
      const {
        defaultPrice,
        discountPrice,
        discountPercentage,
      } = this.getPricing(newVariant);

      this.defaultPrice = defaultPrice;
      this.discountPrice = discountPrice;
      this.discountPercentage = discountPercentage;
    },
  },
  methods: {
    getPriceVariant: function ({ variant, locale }) {
      return variant?.priceVariants?.find(
        (p) => p.identifier === locale.crystallizePriceVariant
      );
    },
    getPricing(variant) {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const {
        defaultPrice,
        discountPrice,
        discountPercentage,
      } = getRelativePriceVariants({ variant, locale });

      const priceVariant = this.getPriceVariant({ variant, locale });
      const { currency } = priceVariant;

      return {
        defaultPrice: formatCurrency({
          locale,
          amount: defaultPrice.price,
          currency,
        }),
        discountPrice:
          discountPrice &&
          formatCurrency({ locale, amount: discountPrice.price, currency }),
        discountPercentage,
      };
    },
  },
};
</script>

<style scoped src='./index.css'></style>