<template>
  <div>
    hey - dynamic
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

    console.log(data);

    return data;
 }
}
</script>