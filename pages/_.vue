<template>
  <div>
    <Document 
      v-if="document.components[0].name === 'Title'"
      :document="document" 
    />
    <Folder v-else :data="folder" />
  </div>
</template>

<script>
import Folder from '../page-components/Folder';
import Document from '../page-components/Document';
import { simplyFetchFromGraph } from '../libs/graph';
import fragments from '../libs/graph/fragments';

export default {
  components: {
    Folder,
    Document
  },
  async asyncData({ route }) {
     const folderPageQuery = `
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

     const documentPageQuery = `
       query FOLDER_PAGE($language: String!, $path: String, $version: VersionLabel! ) {
          document: catalogue(language: $language, path: $path, version: $version) {
            ...item
            ...product
          }
        }

      ${fragments}
    `

    const { data: folderData } = await simplyFetchFromGraph({ query: folderPageQuery, variables: {
      language: 'en',
      path: route.fullPath,
      version: 'published'
    }});


    const { data: DocumentData } = await simplyFetchFromGraph({ query: documentPageQuery, variables: {
      language: 'en',
      path: route.fullPath,
      version: 'published'
    }});
    
    return { 
      folder: folderData, 
      document: DocumentData.document 
    }
  },
}
</script>

<style scoped>

</style>>