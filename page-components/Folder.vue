<template>
  <div>
    <SubHeader centerContent="true">
      <H1>{{ folder.name }}</H1>
      <Shape />
    </SubHeader>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../libs/graph';
import fragments  from '../libs/graph/fragments';

export default {
  data() {
    return {
      folder: ''
    }
  },
  async fetch() {
     const query = `
      query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel!) {
        folder: catalogue(language: $language, path: $path, version: $version) {
          ...item

          children {
            ...item
            ...product
          }
        }
      }

      ${fragments}
    `

    const { data } = await simplyFetchFromGraph({ query, variables: {
      language: 'en',
      path: this.$route.path,
      version: 'published'
    }});
    
    const { folder } = data;
    const { children } = folder;
    
    this.folder = folder;

    const gridRelations = folder.components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

    const rest = folder.components?.filter((c) => c.type !== 'gridRelations');

    console.log(rest)
  }
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}
</style>