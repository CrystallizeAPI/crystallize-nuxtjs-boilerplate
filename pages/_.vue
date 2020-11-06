<template>
  <div>
    <div>
      Type: {{catalogue.type}}
    </div>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../lib/graph';

export default {
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

    return {
      catalogue: data.catalogue
    };
 }
}
</script>