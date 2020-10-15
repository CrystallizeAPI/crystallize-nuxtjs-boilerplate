<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p>
  <div v-else>
    <SubHeader centerContent="true">
      <H1>{{ folder.name }}</H1>
      <Shape :components="rest" />
    </SubHeader>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../libs/graph';
import fragments  from '../libs/graph/fragments';

export default {
  data() {
    return {
      folder: '',
      rest: ''
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

    this.rest = rest;
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