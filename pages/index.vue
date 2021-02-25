<template>
  <Outer>
    <FetchLoader :state="$fetchState">
      <CrystallizeGrid v-if="grid" :grid="grid" />
      <Stackable :stacks="stackableContent" />
    </FetchLoader>
  </Outer>
</template>

<script>
import { getFolderData } from "../page-components/Folder/get-folder-data";

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
    });

    // Extract the stackable content that we want to show
    this.grid = data.folder?.components?.find(
      (c) => c.type === "gridRelations"
    )?.content?.grids?.[0];

    this.stackableContent = data.folder?.components?.find(
      (c) => c.name === "Stackable content"
    )?.content?.items;
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
.no-grids {
  padding: 50px;
  text-align: center;
}
</style>
