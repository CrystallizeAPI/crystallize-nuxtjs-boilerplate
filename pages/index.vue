<template>
  <div class="outer">
    <Grid />
  </div>
</template>

<script>
import { simplyFetchFromGraph } from '../libs/graph';

export default {
  async asyncData({ params, $http }) {
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
    const response = await simplyFetchFromGraph({ query });

    return { catalogue: response.data }
  }
}
</script>

<style scoped>
.outer {
  /* max-width: 1600px;
  padding: 0; */

  margin-bottom: 30px;
  max-width: 1600px;
  padding: 0 0;
  margin: 0 auto;
  display: block;
  min-height: 75vh;
}

@media (max-width: 1024px) {
  .outer {
    padding: 0 1rem;
  }
}


</style>
