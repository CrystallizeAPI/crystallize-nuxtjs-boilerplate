<template>
  <button class="product-page__buy" @click="$emit('click')">
    {{ $t("product.addToBasket") }}
  </button>
</template>

<style scoped src='./index.css'></style>