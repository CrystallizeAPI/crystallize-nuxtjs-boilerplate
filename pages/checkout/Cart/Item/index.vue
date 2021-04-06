<template>
  <article class="cart-item">
    <CrystallizeImage :image="image" class="cart-item__media" />
    <div class="cart-item__info">
      <h5 class="cart-item__name">{{ name }}</h5>
      <ul v-if="attributes" class="cart-item__topics">
        <li
          v-for="attr in attributes"
          :key="attr.attribute"
          class="cart-item__topics-element"
        >
          {{ attr.value }}
        </li>
      </ul>
      <p v-else>{{ this.sku }}</p>
    </div>
    <div class="cart-item__amount">
      <span class="cart-item__quantity">
        {{ this.quantity }} x {{ totalAmountPerItem }}
      </span>
      <span class="cart-item__price">{{ priceFormatted }}</span>
    </div>
  </article>
</template>

<script>
import { formatCurrency } from "/lib/pricing";
export default {
  data() {
    return {
      product: {
        sku: this.sku,
        path: this.path,
      },
    };
  },
  computed: {
    totalAmountPerItem() {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { gross, currency } = this.price;
      const amount = gross * this.quantity;
      if (!gross || gross === 0) {
        return `FREE`;
      }

      return formatCurrency({ currency, amount, locale });
    },
    priceFormatted() {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { gross, currency } = this.price;
      if (!gross || gross === 0) {
        return `FREE`;
      }

      return formatCurrency({ currency, amount: gross, locale });
    },
  },
  props: {
    sku: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    attributes: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>