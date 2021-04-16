<template>
  <div class="total-info">
    <span>{{ label }}:</span>
    <span class="total-info__amount">{{ amount }}</span>
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