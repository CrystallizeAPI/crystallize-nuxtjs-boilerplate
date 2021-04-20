<template>
  <button :class="dynamicClass" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
    },
    alignment: {
      type: String,
      required: false,
      default: "left",
    },
  },
  computed: {
    dynamicClass: function () {
      const baseClass = "button";
      const classes = [baseClass];

      classes.push(`${baseClass}--${this.alignment}`);

      return classes.join(" ");
    },
  },
};
</script>

<style scoped src='./index.css'></style>
