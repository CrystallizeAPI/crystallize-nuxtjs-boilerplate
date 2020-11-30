<template>
  <strong class="price">{{ priceDisplay }}</strong>
</template>

<script>
export default {
  props: {
    variant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      priceDisplay: this.getPrice(this.variant),
    };
  },
  watch: {
    variant: function (newVal) {
      this.priceDisplay = this.getPrice(newVal);
    },
  },
  methods: {
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

      return "N/A";
    },
  },
};
</script>
