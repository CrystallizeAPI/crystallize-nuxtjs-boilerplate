<template>
  <button class="button outer" @click="$emit('click')">
    <span class="inner">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped src='./index.css'></style>
