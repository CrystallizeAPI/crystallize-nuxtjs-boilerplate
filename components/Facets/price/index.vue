<template>
  <div class="facet-price">
    <div class="facet-price__inputs">
      <input
        class="facet-price__input"
        type="number"
        :value="currentValue.min"
        @change="handleMinPriceChange"
        aria-label="minimum price"
      />
      <input
        class="facet-price__input"
        type="number"
        :value="currentValue.max"
        @change="handleMaxPriceChange"
        aria-label="maximum price"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentValue: {
        min: this.value.min,
        max: this.value.max,
      },
    };
  },
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
      const max =
        this.currentValue.max > min ? this.currentValue.max : this.max;
      this.currentValue = { min, max };

      this.$emit("on-price-change", { min, max });
    },
    handleMaxPriceChange: function (event) {
      const max = this.parseValue(event.target.value);
      const min =
        this.currentValue.min < max ? this.currentValue.min : this.min;
      this.currentValue = { min, max };

      this.$emit("on-price-change", { min, max });
    },
  },
};
</script>

<style scoped src='./index.css'></style>