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
      type: Array,
      required: true,
      default: null,
    },
  },
  data() {
    const flattened = [];
    this.grid
      ?.map((r) => r.rows)
      .map((col) => {
        col.map((data) => {
          data.columns.map((column) => {
            flattened.push(column);
          });
        });
      });

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
  grid-template-rows: 700px;
}

@media (max-width: 768px) {
  .grid {
    display: block !important;
    grid-template-columns: 100% !important;
  }
}
</style>
