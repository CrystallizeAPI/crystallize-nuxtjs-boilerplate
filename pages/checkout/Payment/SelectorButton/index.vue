<template>
  <button
    :class="dynamicButtonClasses"
    :aria-label="name"
    @click="$emit('click')"
    :style="{ backgroundColor: hexColor }"
  >
    <img class="payment-selector__logo" :src="src" :alt="name" />
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    hexColor: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    dynamicButtonClasses() {
      const baseClass = "payment-selector";

      let classes = [baseClass];
      this.isSelected && classes.push(`${baseClass}--is-selected`);

      return classes.join(" ");
    },
  },
};
</script>

<style scoped src='./index.css'></style>