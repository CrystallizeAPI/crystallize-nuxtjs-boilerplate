<template>
  <button class="product-page__buy" @click="$emit('click')">
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      {{ $t("product.addToBasket") }}
    </template>
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>