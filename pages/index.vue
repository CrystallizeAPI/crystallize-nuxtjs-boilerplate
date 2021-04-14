<template>
  <div class="home-page">
    <FetchLoader :state="$fetchState">
      <CrystallizeGrid v-if="grid" :grid="grid" />
      <CrystallizeStackable :stacks="stackableContent" />
    </FetchLoader>
  </div>
</template>

<script>
import { getData as getFolderData } from "../page-components/Folder/get-data";
import {
  getFolderGrids,
  getFolderStackableContent,
} from "../page-components/Folder/utils";

export default {
  data() {
    return {
      grid: null,
      stackableContent: null,
    };
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    const { data } = await getFolderData({
      asPath: "/frontpage-2021",
      language: locale.crystallizeCatalogueLanguage,
      preview: this.$route.query.preview,
    });

    const { folder } = data;
    this.grid = getFolderGrids(folder);
    this.stackableContent = getFolderStackableContent(folder);
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

<style scoped src='./index.css'></style>
