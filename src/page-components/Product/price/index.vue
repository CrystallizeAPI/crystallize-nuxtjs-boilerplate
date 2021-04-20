<template>
  <div
    class="product__price"
    :class="discountPercentage ? 'product__price--with-discount' : ''"
  >
    <!-- Displayed if there any kind of discount -->
    <div
      v-if="discountPrice || discountPercentage"
      class="product__price-inner"
    >
      <strong
        class="product__price-current"
        :aria-label="$t('product.price.withDiscountApplied')"
      >
        {{ discountPrice }}
      </strong>
      <div class="product__price-discount-details">
        <span
          v-if="discountPrice"
          class="product__price-discount-amount"
          :aria-label="$t('product.price.original')"
        >
          {{ defaultPrice }}
        </span>
        <span
          v-if="discountPercentage"
          class="product__price-discount-percentage"
          :aria-label="$t('product.price.percentage')"
        >
          - {{ discountPercentage }}%
        </span>
      </div>
    </div>
    <!-- This is printed if there is no discount -->
    <div v-else class="product__price-inner">
      <strong
        class="product__price-current"
        aria-label="$t('product.price.price')"
      >
        {{ defaultPrice }}
      </strong>
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