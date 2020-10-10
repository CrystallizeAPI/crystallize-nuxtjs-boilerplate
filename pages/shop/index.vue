<template>
  <div>
    <h1>this is the shop</h1>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../../libs/graph';
import fragments from '../../libs/graph/fragments';

export default {
  async asyncData({ route }) { 
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
      path: route.path,
      version: 'published'
    }});
  }
}
</script>

<style scoped>

</style>