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
    >
      <ListFormatProduct
        v-if="cell.item.type === 'product'"
        :data="cell.item"
      />
      <ListFormatFolder v-if="cell.item.type === 'folder'" :data="cell.item" />
      <ListFormatDocument
        v-if="cell.item.type === 'document'"
        :data="cell.item"
      />
    </GridItem>
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

<style scoped src='./index.css'></style>
