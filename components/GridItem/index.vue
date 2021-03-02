<template>
  <div
    class="grid-item__inner"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
    :class="`grid-item ${cellDynamicClass}`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    gridCell: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      cellDynamicClass: `cell cell-${this.gridCell?.layout?.rowspan}x${this.gridCell?.layout?.colspan}`,
    };
  },
};
</script>

<style scoped src='./index.css'></style>
