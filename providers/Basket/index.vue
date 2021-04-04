<template>
  <div class="basket-provider">
    <slot />
  </div>
</template>

<script>
export default {
  async mounted() {
    /**
     * When the applicattion is mounted, we must populate the store.
     */
    this.$store.dispatch("basket/loadBasket").then(() => {
      this.$store.dispatch("basket/updateServerBasket");
    });
  },
};
</script>
