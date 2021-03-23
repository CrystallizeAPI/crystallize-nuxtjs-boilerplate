<template>
  <div class="facet-price">
    <div class="facet-price__inputs">
      <input
        class="facet-price__input"
        type="number"
        :value="this.value.min"
        @change="handleMinPriceChange"
        aria-label="minimum price"
      />
      <input
        class="facet-price__input"
        type="number"
        :value="this.value.max"
        @change="handleMaxPriceChange"
        aria-label="maximum price"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    parseValue: function (value) {
      return parseFloat(value);
    },
    handleMinPriceChange: function (event) {
      const min = this.parseValue(event.target.value);
      const max = this.value?.max > min ? this.value?.max : this.max;

      this.$emit("on-price-change", { min, max });
    },
    handleMaxPriceChange: function (event) {
      const max = this.parseValue(event.target.value);
      const min = this.value?.min < max ? this.value?.min : this.min;

      this.$emit("on-price-change", { min, max });
    },
  },
};
</script>

<style scoped src='./index.css'></style>