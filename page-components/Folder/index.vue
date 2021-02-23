<template>
  <FetchLoader :state="$fetchState">
    <div class="folder--sub-header">
      <h1>{{ folder.name }}</h1>

      <CrystallizeImage v-if="headerImage" :image="headerImage" />
      <div v-if="headerDescription" class="folder--header-description">
        <CrystallizeContentTransformer :data="headerDescription" />
      </div>
    </div>
    <div class="folder--content">
      <CrystallizeGrid v-if="grid" :grid="grid" />
      <CrystallizeCatalogueItems
        v-else-if="folder.children"
        :items="folder.children"
      />
    </div>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { simplyFetchFromGraph } from "../../lib/graph";
import fragments from "../../lib/graph/fragments";

export default {
  data() {
    return {
      folder: {},
      grid: null,
      headerImage: null,
      headerDescription: null,
    };
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

    // Get a header image to display
    const imagesComponent = folder.components?.find((c) => c.type === "images");
    if (imagesComponent?.content?.images) {
      const [image] = imagesComponent.content.images;
      this.headerImage = image;
    }

    // Get a description for the folder
    const richTextComponent = folder.components?.find(
      (c) => c.type === "richText"
    );
    if (richTextComponent?.content?.json) {
      this.headerDescription = richTextComponent.content.json;

      // Provide a good meta description for this page
      this.metaDescription = toText(richTextComponent.content.json);
    }

    this.folder = folder;
    this.grid = grid?.content?.grids?.[0];
  },
  head() {
    if (!this.metaDescription && this.folder?.name) {
      console.warn(
        "this.metaDescription is missing for folder",
        this.folder.name
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

<style src='./index.css'></style>
