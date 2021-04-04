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
        class="tiny-basket-item__quantity-modifier"
        :aria-label="`Increment quantity by 1 of ${name}`"
      >
        +
      </button>
      <span class="tiny-basket-item__quantity">{{ quantity }}</span>
      <button
        class="tiny-basket-item__quantity-modifier"
        :aria-label="`Decrement quantity by 1 of ${name}`"
      >
        -
      </button>
      <!-- <button>R</button> -->
    </div>
  </article>
</template>

<script>
export default {
  computed: {
    priceFormatted() {
      if (!this.price.gross || this.price.gross === 0) {
        return `FREE`;
      }

      return `${this.price.currency} ${this.price.gross}`;
    },
  },
  props: {
    name: {
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
};
</script>

<style scoped src='./index.css'></style>