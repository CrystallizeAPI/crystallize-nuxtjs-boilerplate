<template>
  <div
    class="grid"
    :style="{ gridTemplateColumns: `repeat(${totalColSpan}, 1fr)` }"
  >
    <GridItem
      v-for="cell in flattened"
      :key="cell.itemId"
      :data="cell.item"
      :grid-cell="cell"
    />
  </div>
</template>

<script>
export default {
  props: {
    grid: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    const flattened = [];

    /**
     * Flatten the grid so that it is
     * easier to convert to a CSS grid
     */
    this.grid?.rows?.map((row) => {
      row.columns?.map((column) => {
        if (column.item) {
          flattened.push(column);
        }
      });
    });

    // Get the total number of columns in a row
    const totalColSpan =
      this.grid?.rows?.[0]?.columns?.reduce(
        (acc, col) => acc + col.layout.colspan,
        0
      ) ?? 0;

    return {
      totalColSpan,
      flattened,
    };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 20px;
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: 1fr 1fr !important;
  }
}

@media (max-width: 768px) {
  .grid {
    display: block !important;
  }
}
</style>
