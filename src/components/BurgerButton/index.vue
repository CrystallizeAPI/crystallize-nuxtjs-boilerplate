<template>
  <!--
    The shorthand for :v-on is @. For example:
    - Instead of <button v-on:click="functionName">
    - We can do <button @:click="functionName">
  -->
  <button type="button" @click="$emit('click')" :aria-label="$t('common.menu')">
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
