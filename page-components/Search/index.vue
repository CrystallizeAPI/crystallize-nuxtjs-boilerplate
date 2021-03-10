<template>
  <FetchLoader :state="$fetchState">
    <PageHeader :title="title" :description="headerDescription" />
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getSearchData } from "./get-data";
import { urlToSpec } from "../../lib/search";

export default {
  data() {
    return {
      title: null,
      headerDescription: null,
      stacks: null,
      spec: null,
      data: null,
      totalResults: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    const asPath = route.path;
    const { search, catalogue, language } = await getSearchData({
      asPath,
      preview: null,
      language: locale.crystallizeCatalogueLanguage,
      searchSpec: { type: "PRODUCT", ...urlToSpec({ asPath }, locale) },
    });
    console.log({ search, catalogue, language });

    /**
     * As default, we get EVERYTHING for this folder
     * You probably want to cherry pick the fields in
     * the query here to improve performance
     */
    this.title = "harcoded title for search";
    this.subFolders = null;
  },
  head() {
    if (!this.metaDescription) {
      console.warn("this.metaDescription is missing for search");
    }

    return {
      title: "harcoded title for search",
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
