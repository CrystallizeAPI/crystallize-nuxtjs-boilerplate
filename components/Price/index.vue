<template>
  <div v-if="discountPrice" class="price price--with-discount">
    <!-- Price with discount-->
    <strong>{{ defaultPrice }}</strong>
    <div>{{ discountPrice }}</div>
  </div>
  <div v-else class="price">
    <!-- Price without discount-->
    <strong>{{ defaultPrice }}</strong>
  </div>
</template>

<script>
import getRelativePriceVariants from "./getRelativePriceVariants";
export default {
  props: {
    variant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ...this.getNewPrice(this.variant),
    };
  },
  watch: {
    variant: function (newVal) {
      this.priceDisplay = this.getPrice(newVal);
    },
  },
  methods: {
    getPriceVariant: function ({ variant, locale }) {
      return variant.priceVariants.find(
        (p) => p.identifier === locale.crystallizePriceVariant
      );
    },
    getNewPrice(variant) {
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
        defaultPrice: this.formatPrice({
          locale,
          amount: defaultPrice.price,
          currency,
        }),
        discountPrice:
          discountPrice &&
          this.formatPrice({ locale, amount: discountPrice.price, currency }),
        discountPercentage,
      };
    },
    formatPrice: function ({ locale, amount, currency }) {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(amount);
    },
    getPrice(variant) {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const priceVariant = variant.priceVariants.find(
        (p) => p.identifier === locale.crystallizePriceVariant
      );

      if (priceVariant) {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: priceVariant.currency,
        }).format(priceVariant.price);
      }

      const {
        defaultPrice,
        discountPrice,
        discountPercentage,
      } = getRelativePriceVariants({ variant, locale });

      return "N/A";
    },
  },
};
</script>

<style scoped src='./index.css'></style>