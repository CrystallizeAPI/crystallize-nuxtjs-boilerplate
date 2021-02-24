<template>
  <FetchLoader :state="$fetchState">
    <PageHeader
      :title="folder.name"
      :description="headerDescription">
      <template v-slot:postHeader>
        <div v-if="subFolders" class="subfolder-list">
        <NuxtLink
          v-for="subFolder in subFolders"
          :to="subFolder.path"
          :key="subFolder.name">
          <Tag>{{subFolder.name}}</Tag>
        </NuxtLink>
        </div>
      </template>
    </PageHeader>
    <div class="folder__content">
      <CrystallizeGrid v-if="grid" :grid="grid" />
      <!--
      <CrystallizeCatalogueItems
        v-else-if="folder.children"
        :items="folder.children"
      /> -->

      <!-- @TODO: Add body -->
      <CrystallizeComponents :components="[body]"/>

      <!-- @TODO: Add stackable -->
      <!-- @TODO: Add List -->
    </div>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getFolderData } from './get-folder-data'
import { getFolderTitle, isFolderType } from './utils'

export default {
  data() {
    return {
      body: null,
      folder: {},
      grid: null,
      headerDescription: null,
      headerImage: null,
      subFolders: null,
      title: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * As default, we get EVERYTHING for this folder
     * You probably want to cherry pick the fields in
     * the query here to improve performance
     */
    const response = await getFolderData({
      asPath: route.path,
      language: locale.crystallizeCatalogueLanguage,
    });

    const { folder } = response.data;
    this.folder = folder;
    this.title = getFolderTitle(folder)
    const { components, children } = folder
    
    const subFolders = children?.filter(isFolderType);
    this.subFolders = subFolders || null

    if (components && components.length > 0) {
      // Get a header image to display
      const imagesComponent = components.find(({type}) => type === "images");
      if (imagesComponent?.content?.images) {
        const [firstImage] = imagesComponent.content.images;
        this.headerImage = firstImage;
      }

      // Get a description for the folder
      const richTextComponent = components.find(({type}) => type === "richText");
      if (richTextComponent?.content?.json) {
        this.headerDescription = richTextComponent.content.json;
        this.metaDescription = toText(richTextComponent.content.json);
      }

      this.body = components.find(({name}) => name === 'Body') || []

      // Get a grid to display
      const grid = components.find(({type}) => type === "gridRelations");
      this.grid = grid?.content?.grids?.[0];
    }
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
