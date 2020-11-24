<template>
  <div>
    <SubHeader center-content="true">
      <H1>{{ folder.name }}</H1>
      <Shape :components="rest" />
    </SubHeader>
    <div v-if="gridRelations.length > 0">
      <Grid>
        <GridItem
          v-for="cell in gridRelations"
          :key="cell.itemId"
          :data="cell.item"
          :grid-cell="cell"
        />
      </Grid>
    </div>
    <div v-else-if="children" class="list">
      <Items v-for="(item, i) in children" :key="i" :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "gridCell"],
  data() {
    return {
      folder: this.data.folder,
      children: this.data.folder.children,
      rest: [],
      gridRelations: [],
    };
  },
  mounted() {
    const gridRelations = this.folder.components
      ?.filter((c) => c.type === "gridRelations")
      ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

    const rest = this.folder.components?.filter(
      (c) => c.type !== "gridRelations"
    );

    const columns = gridRelations.map((r) => r.rows);

    let rows = [];

    columns.map((col) => {
      col.map((data) => {
        data.columns.map((column) => {
          rows.push(column);
        });
      });
    });

    this.rest = rest;
    this.gridRelations = rows;
  },
  methods: {
    filterRelations() {},
  },
};
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}

@media (max-width: 768px) {
  .list {
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1600px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}

@media (min-width: 1600px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
