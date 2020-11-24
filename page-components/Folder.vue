<template>
  <div>
    <SubHeader center-content>
      <H1>{{ folder.name }}</H1>
    </SubHeader>
    <div v-if="gridToDisplay">
      <Grid :grid="gridToDisplay" />
    </div>
    <div v-else-if="folder.children" class="list">
      <Items v-for="item in folder.children" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from "../lib/graph";
import fragments from "../lib/graph/fragments";

export default {
  data() {
    return { folder: {}, gridToDisplay: null, allComponentsButGrid: null };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Get EVERYTHING for this folder
     * You probably want to cherry pick the fields to
     * show here to improve frontend performance
     */
    const response = await simplyFetchFromGraph({
      query: `
        query FOLDER_PAGE($path: String!, $language: String!) {
          folder: catalogue (path: $path, language: $language) {
            ...item
            children {
              ...item
              ...product
            }
          }
        }

        ${fragments}
      `,
      variables: {
        path: route.path,
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    const { folder } = response.data;

    // Get a grid to display
    const gridToDisplay = folder.components?.find(
      (c) => c.type === "gridRelations"
    );

    // Filter out the rest of the components
    const allComponentsButGrid = folder.components?.filter(
      (c) => c.type !== "gridRelations"
    );

    this.folder = folder;
    this.gridToDisplay = gridToDisplay?.content?.grids?.[0];
    this.allComponentsButGrid = allComponentsButGrid;
  },
};
</script>

<style scoped></style>
