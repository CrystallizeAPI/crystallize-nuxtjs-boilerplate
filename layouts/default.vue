<template>
  <div>
    <Header :catalogue="catalogue" :fetchState="$fetchState" />
      <nuxt />
    <Footer :catalogue="catalogue" :fetchState="$fetchState" />
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../libs/graph';

export default {
  data() {
    return { catalogue: {} };
  },
  async fetch() {
    const query = `
      query {
        catalogue {
          children {
            id
            name
          }
        }
      }
    `
    const { data } = await simplyFetchFromGraph({ query });

    const result = data.catalogue.children.filter(c => c.name !== '_web-frontpage');

    this.catalogue = result;
  },
};
</script>

