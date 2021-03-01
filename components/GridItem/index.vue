<template>
  <div
    class="grid-item__inner"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
    :class="`grid-item grid-item--${type} ${cellDynamicClass}`"
  >
    <ListFormatProduct v-if="data.type === 'product'" :data="data" />
    <ListFormatFolder v-if="data.type === 'folder'" :data="data" />
    <ListFormatDocument v-if="data.type === 'document'" :data="data" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
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
