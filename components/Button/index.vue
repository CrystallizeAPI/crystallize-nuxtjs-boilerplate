<template>
  <button class="button" @click="$emit('click')">
    <span class="button__inner">
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
