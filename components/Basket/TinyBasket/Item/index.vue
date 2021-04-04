<template>
  <article class="tiny-basket-item">
    <CrystallizeImage :image="image" class="tiny-basket-item__media" />
    <div class="tiny-basket-item__info">
      <h5 class="tiny-basket-item__name">
        {{ name }}
      </h5>
      <!-- <div class="tiny-basket-item__topics">render list</div> -->
      <div class="tiny-basket-item__price">{{ priceFormatted }}</div>
    </div>
    <div class="tiny-basket-item__actions">
      <button
        @click="handleIncreaseQuantity"
        class="tiny-basket-item__quantity-modifier"
        :aria-label="`Increment quantity by 1 of ${name}`"
      >
        +
      </button>
      <span class="tiny-basket-item__quantity">{{ quantity }}</span>
      <button
        @click="handleDecreaseQuantity"
        class="tiny-basket-item__quantity-modifier"
        :aria-label="`Decrement quantity by 1 of ${name}`"
      >
        -
      </button>
      <button
        @click="handleRemoveQuantity"
        class="tiny-basket-item__quantity-modifier tiny-basket-item__quantity-modifier--remove"
        :aria-label="`Remove the item ${name} from the basket`"
      >
        x
      </button>
    </div>
  </article>
</template>

<script>
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
    priceFormatted() {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { gross, currency } = this.price;
      if (!gross || gross === 0) {
        return `FREE`;
      }

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(gross);
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
  },
  methods: {
    handleIncreaseQuantity() {
      this.$store.dispatch("basket/incrementItem", {
        sku: this.sku,
        path: this.path,
      });
    },
    handleDecreaseQuantity() {
      this.$store.dispatch("basket/decrementItem", {
        sku: this.sku,
        path: this.path,
      });
    },
    handleRemoveQuantity() {
      this.$store.dispatch("basket/removeItem", {
        sku: this.sku,
        path: this.path,
      });
    },
  },
};
</script>

<style scoped src='./index.css'></style>