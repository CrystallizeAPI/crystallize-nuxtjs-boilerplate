<template>
  <div class="outer">
    <Grid :grid="grid">
      <GridItem 
        v-for="cell in rows"
        :key="cell.itemId"
        :data="cell.item"
        :gridCell="cell"
      />
    </Grid>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../libs/graph';
import fragments from '../libs/graph/fragments';


export default {
  async asyncData() {
    const query = `
      query FRONTPAGE($language: String!, $path: String!,  $version: VersionLabel!) {
        catalogue(path: $path, language: $language, version: $version) {
          ...item
          ...product
        }
      }

      ${fragments}
    `
    const { data } = await simplyFetchFromGraph({ query, variables: {
      language: 'en',
      path: '/web-frontpage',
      version: 'published'
    }});

    const [grid] = data.catalogue?.components?.find((c) => c.type === 'gridRelations')?.content?.grids || [];



    const columns = grid.rows.map(r =>  r.columns);


    let rows = [];

    columns.map(col => {
      col.map(data => {
        rows.push(data);
      })
    });

    return { rows, grid }
  }
}
</script>

<style scoped>
.outer {
  /* max-width: 1600px;
  padding: 0; */

  margin-bottom: 30px;
  max-width: 1600px;
  padding: 0 0;
  margin: 0 auto;
  display: block;
  min-height: 75vh;
}

@media (max-width: 1024px) {
  .outer {
    padding: 0 1rem;
  }
}
</style>
