<template>
  <!--
    The shorthand for :v-on is @. For example:
    - Instead of <button v-on:click="functionName">
    - We can do <button @:click="functionName">
  -->
  <button
    @click="$emit('click')"
    class="button-close"
    :aria-label="screenReaderText"
  ></button>
</template>

<script>
export default {
  props: {
    screenReaderText: {
      type: String,
      required: false,
      default: "close",
    },
  },
};
</script>

<style scoped src='./index.css'></style>