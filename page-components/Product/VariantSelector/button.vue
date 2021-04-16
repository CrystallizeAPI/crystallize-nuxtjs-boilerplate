<template>
  <button
    :aria-label="`${value} ${attributeName}`"
    @click="$emit('selectVariant', attributeName, value)"
    :class="dynamicButtonClasses"
  >
    <div>
      <CrystallizeImage
        v-if="image"
        :image="image"
        :width="100"
        :height="100"
      />
      {{ value }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      required: true,
      default: false,
    },
    attributeName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dynamicButtonClasses: this.retrieveDynamicClasses(),
    };
  },
  methods: {
    retrieveDynamicClasses: function () {
      const baseClass = "variant-selector__button";
      let stylesArr = [baseClass];
      this.isSelected && stylesArr.push(`${baseClass}--is-selected`);
      this.image && stylesArr.push(`${baseClass}--has-image`);

      return stylesArr.join(" ");
    },
  },
  watch: {
    isSelected: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    attr: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    value: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    image: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
  },
};
</script>

<style scoped src='./button.css'></style>
