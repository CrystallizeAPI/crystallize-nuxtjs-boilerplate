<template>
  <button :class="dynamicClass" :aria-label="label" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    isDisplayed: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     * Type only should accept the values: "previous, next"
     */
    direction: {
      type: String,
      required: true,
    },
  },
  computed: {
    dynamicClass() {
      const baseClass = "catalogue-slider__button";
      const classes = [baseClass, `${baseClass}--${this.direction}`];

      this.isDisplayed && classes.push(`${baseClass}--is-displayed`);

      return classes.join(" ");
    },
  },
};
</script>

<style scoped src='./index.css'></style>