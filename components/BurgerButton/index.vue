<template>
  <button
    type="button"
    @click="$emit('click')"
    aria-label='menu'>
    <div class="lines" :class="open ? 'open' : ''"></div>
  </button>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
    },
  },
};
</script>

<style scoped src='./index.css'></style>
