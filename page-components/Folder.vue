<template>
  <div>
    <SubHeader centerContent="true">
      <H1>{{ folder.name }}</H1>
      <Shape :components="rest" />
    </SubHeader>
    <div v-if="grid">
      <Grid :grid="grid">
        <GridItem 
          v-for="cell in gridCells"
          :key="cell.itemId"
          :data="cell.item"
          :gridCell="cell"
        />
      </Grid>
    </div>
    <div class="list"  v-else-if="children">
      <Items
        v-for="(item, i) in children" 
        :key="i"
        :item="item"
      />   
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    const grid = this.data.folder?.components?.filter((c) => c.type !== 'gridRelations')?.[0];
    const gridCells = [];
    // grid?.rows.forEach(r => gridCells.push.apply(null, r.columns));

    return {
      folder: this.data.folder,
      children: this.data.folder.children,
      grid,
      gridCells,
      rest: [],
      gridRelations: []
    }
  },
  mounted() {
     const gridRelations = this.folder.components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

    // console.log('MY CHILDREN DATA', this.children);
    
    const rest = this.folder.components?.filter((c) => c.type !== 'gridRelations');

    const columns = gridRelations.map(r =>  r.rows);

    let rows = [];

    columns.map(col => {
      col.map(data => {
        data.columns.map(column => {
          rows.push(column);
        })
      })
    });

    this.rest = rest;
    this.gridRelations = rows;
  },
  methods: {
    filterRelations() {

    }
  }
}
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