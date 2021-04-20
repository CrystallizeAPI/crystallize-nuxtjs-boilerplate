<template>
  <!-- The button has fixed sizes, so the image doesn't trigger reflow -->
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-label="screenReaderText"
    class="icon-button"
  >
    <img :src="iconSrc" alt="" />
  </NuxtLink>
  <button
    v-else
    :aria-label="screenReaderText"
    @click="$emit('click')"
    class="icon-button"
  >
    <img :src="iconSrc" alt="" />
  </button>
</template>

<script>
export default {
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
    /*
     * Screen readers will understand the contnet of the button
     * thanks to this text that explains what's the purpose of this button
     * Eg: Open menu, search for items, go to profile, etc.
     */
    screenReaderText: {
      type: String,
      required: true,
    },
    /*
     * This props make the component render a link
     */
    to: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped src='./index.css'></style>