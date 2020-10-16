<template>
  <div>
    <Folder :data="folder" />
  </div>
</template>

<script>
import Folder from '../page-components/Folder';
import { simplyFetchFromGraph } from '../libs/graph';
import fragments from '../libs/graph/fragments';

export default {
  components: {
    Folder
  },
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
      path: route.fullPath,
      version: 'published'
    }});

    // console.log('DATA FROM THE FOLDER', data);
    
    return { folder: data }
  },
}
</script>

<style scoped>

</style>>