<template>
  <div class="outer">
    <Grid v-if="grid" :grid="grid" />
    <div v-else class="no-grids">No grids to show on the frontpage</div>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from "../lib/graph";
import fragments from "../lib/graph/fragments";

export default {
  data() {
    return {
      grid: null,
    };
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    const query = `
      query FRONTPAGE($language: String!, $path: String!) {
        frontpage: catalogue(path: $path, language: $language) {
          ...item
          ...product
        }
      }

      ${fragments}
    `;
    const { data } = await simplyFetchFromGraph({
      query,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
        path: "/web-frontpage",
      },
    });

    const grid = data.frontpage?.components?.find(
      (c) => c.type === "gridRelations"
    )?.content?.grids?.[0];

    this.grid = grid;
  },
  head() {
    return {
      title: "Frontpage",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "NuxtJS ecommerce with Crystallize",
        },
      ],
    };
  },
};
</script>

<style scoped>
.outer {
  margin-bottom: 30px;
  max-width: 1600px;
  padding: 0 0;
  margin: 0 auto;
  display: block;
  min-height: 75vh;
}

.no-grids {
  padding: 50px;
  text-align: center;
}

@media (max-width: 1024px) {
  .outer {
    padding: 0 1rem;
  }
}
</style>
