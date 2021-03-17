<template>
  <div class="facet-checkbox">
    <label class="facet-checkbox__label">
      <span class="facet-checkbox__checkbox-wrapper">
        <input
          class="facet-checkbox__checkbox"
          type="checkbox"
          :checked="isChecked"
          @change="$emit('on-change')"
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
      default: false,
    },
  },
};
</script>
<style scoped src='./index.css'></style>