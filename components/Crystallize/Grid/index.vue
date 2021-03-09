<template>
  <div
    class="grid"
    :style="{
      gridTemplateColumns: `repeat(${totalGridColumns}, 1fr)`,
      gridTemplateRows: `repeat(${totalGridRows}, var(--grid-row-height))`,
    }"
  >
    <CrystallizeGridItem
      v-for="cell in flattened"
      :key="cell.itemId"
      :grid-cell="cell"
    >
      <ListFormat :data="cell.item" />
    </CrystallizeGridItem>
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
    const totalGridColumns =
      this.grid?.rows?.[0]?.columns?.reduce(
        (acc, col) => acc + col.layout.colspan,
        0
      ) ?? 0;

    return {
      totalGridColumns,
      totalGridRows: this.grid?.rows?.length || null,
      flattened,
    };
  },
};
</script>

<style scoped src='./index.css'></style>
