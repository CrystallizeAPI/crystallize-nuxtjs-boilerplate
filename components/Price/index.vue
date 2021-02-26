<template>
  <div v-if="discountPrice" class="price price--with-discount">
    <!-- Price with discount-->
    <strong>{{ discountPrice }}</strong>
    <div class="price__old-price">{{ defaultPrice }}</div>
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
  data: function () {
    const { defaultPrice, discountPrice, discountPercentage } = this.getPricing(
      this.variant
    );
    console.log({ defaultPrice, discountPrice, discountPercentage });

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
      return variant.priceVariants.find(
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
  },
};
</script>

<style scoped src='./index.css'></style>