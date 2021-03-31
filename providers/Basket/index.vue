<template>
  <div class="basket-provider">
    <slot />
  </div>
</template>

<script>
export default {
  async mounted() {
    /**
     * Basket logic when the application is loaded for first time
     */
    this.$store
      .dispatch("basket/updateBasket")
      .then(() => console.log("after loadBasket finished"));
  },
};
</script>
