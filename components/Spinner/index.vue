<template>
  <svg
    :height="size"
    :width="size"
    role="img"
    aria-labelledby="title desc"
    viewBox="0 0 32 32"
  >
    <title id="title">{{ $t("common.spinner.title") }}</title>
    <desc id="desc">{{ $t("common.spinner.desc") }}</desc>
    <circle
      role="presentation"
      cx="16"
      cy="16"
      fill="none"
      :r="circleR"
      :stroke="color"
      :stroke-width="thickness"
      :stroke-dasharray="strokeDasharray"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: [String, Number],
      default: "25px",
    },
    color: {
      type: String,
      default: "currentColor",
    },
    gap: {
      type: Number,
      default: 4,
    },
    thickness: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      circleR: 14 - this.thickness / 2,
      strokeDasharray: Math.PI * 2 * (11 - this.gap),
    };
  },
};
</script>

<style scoped src="./index.css"></style>
