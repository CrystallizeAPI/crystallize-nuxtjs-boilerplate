<template>
  <article class="cart-item">
    <CrystallizeImage v-if="image" :image="image" class="cart-item__media" />
    <div class="cart-item__info">
      <h5 class="cart-item__name">{{ item.name }}</h5>
      <ul v-if="item.attributes" class="cart-item__topics">
        <li
          v-for="attr in item.attributes"
          :key="attr.attribute"
          class="cart-item__topics-element"
        >
          {{ attr.value }}
        </li>
      </ul>
      <p v-else>{{ this.item.sku }}</p>
    </div>
    <div class="cart-item__amount">
      <span class="cart-item__quantity">
        {{ this.item.quantity }} x {{ totalAmountPerItem }}
      </span>
      <span class="cart-item__price">{{ priceFormatted }}</span>
    </div>
  </article>
</template>

<script>
import { formatCurrency } from "/lib/pricing";
export default {
  data() {
    const image =
      this.item.images && this.item.images.length > 0
        ? this.item.images[0]
        : null;

    return {
      product: {
        sku: this.item.sku,
        path: this.item.path,
      },
      image,
    };
  },
  computed: {
    totalAmountPerItem() {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { gross, currency } = this.item.price || {};
      const amount = gross * this.item.quantity;

      if (!gross || gross === 0) {
        return `FREE`;
      }

      return formatCurrency({ currency, amount, locale });
    },
    priceFormatted() {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { gross, currency } = this.item.price || {};
      if (!gross || gross === 0) {
        return `FREE`;
      }

      return formatCurrency({ currency, amount: gross, locale });
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: {},
    },
  },
};
</script>

<style scoped src='./index.css'></style>