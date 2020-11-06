<template>
  <div>
    <Folder v-if="isFolder" />
    <Document v-else-if="isDocument" />
    <Product v-else-if="isProduct" />
    <div v-else>No component for route</div>
  </div>
</template>

<script>
import Folder from '../page-components/Folder';
import Document from '../page-components/Document';
import Product from '../page-components/Product';

import { simplyFetchFromGraph } from '../lib/graph';

export default {
  components: {
    Folder,
    Document,
    Product
  },
 async asyncData({ route }) {
   const { data } = await simplyFetchFromGraph({ query: `
    query ITEM_TYPE($language: String!, $path: String!) {
      catalogue(language: $language, path: $path) {
        type
        language
        children {
          type
        }
      }
    }
   `, variables: {
      language: 'en',
      path: route.fullPath,
      version: 'published'
    }});

    const { type } = data.catalogue;

    return {
      isFolder: type === 'folder',
      isDocument: type === 'document',
      isProduct: type === 'product'
    };
 }
}
</script>