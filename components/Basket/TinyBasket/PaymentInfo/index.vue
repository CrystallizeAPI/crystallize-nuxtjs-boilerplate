<template>
  <div class="tiny-basket-payment-info">
    <span>{{ label }}:</span>
    <span class="tiny-basket-payment-info__amount">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped src='./index.css'>
</style>