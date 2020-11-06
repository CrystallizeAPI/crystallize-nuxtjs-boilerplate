<template>
  <div>
    <h1>{{name}}</h1>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../lib/graph';

export default {

  data() {
    return {
      name: 'n/a'
    }
  },

  async fetch() {
    const { route } = this.$nuxt.context;

    const { data } = await simplyFetchFromGraph({ query: `
    query ITEM_TYPE($language: String!, $path: String!) {
      catalogue(language: $language, path: $path) {
        name
      }
    }
   `, variables: {
      language: 'en',
      path: route.fullPath
    }});

    this.name = data.catalogue.name
  }

  
}
</script>

<style scoped>

</style>