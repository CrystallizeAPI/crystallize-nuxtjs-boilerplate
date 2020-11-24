<template>
  <div>
    <SubHeader center-content>
      <H1>{{ folder.name }}</H1>
    </SubHeader>

    <Grid v-if="grid" :grid="grid" />
    <Items
      v-for="item in folder.children"
      v-else-if="folder.children"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import { simplyFetchFromGraph } from "../lib/graph";
import fragments from "../lib/graph/fragments";

export default {
  data() {
    return { folder: {}, grid: null, allComponentsButGrid: null };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Get EVERYTHING for this folder
     * You probably want to cherry pick the fields in
     * the query here to improve performance
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
    const grid = folder.components?.find((c) => c.type === "gridRelations");

    // Filter out the rest of the components
    const allComponentsButGrid = folder.components?.filter(
      (c) => c.type !== "gridRelations"
    );

    this.folder = folder;
    this.grid = grid?.content?.grids?.[0];
    this.allComponentsButGrid = allComponentsButGrid;

    // Provide a good meta description for this page
    this.metaDescription = "";
  },
  head() {
    if (!this.metaDescription) {
      console.warn(
        "this.metaDescription is missing for folder",
        this.folder?.name
      );
    }

    return {
      title: this.folder?.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription,
        },
      ],
    };
  },
};
</script>
