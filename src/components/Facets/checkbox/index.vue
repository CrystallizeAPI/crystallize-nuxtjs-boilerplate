<template>
  <div class="facet-checkbox">
    <label class="facet-checkbox__label" :aria-label="value">
      <span class="facet-checkbox__checkbox-wrapper">
        <input
          class="facet-checkbox__checkbox"
          type="checkbox"
          :checked="isChecked"
          @change="(event) => handleCheckboxChange(event, { value })"
        />
        {{ value }}
      </span>
      <span class="facet-checkbox__counter">({{ count }})</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleCheckboxChange: function (event, { value }) {
      const isChecked = event.target.checked;
      this.$emit("on-change", { value, isChecked });
    },
  },
};
</script>
<style scoped src='./index.css'></style>