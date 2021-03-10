<template>
  <FetchLoader :state="$fetchState">
    <Container>
      <PageHeader :title="title" :description="headerDescription" />
      <CrystallizeCatalogueItems v-if="items" :items="items" />
    </Container>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getSearchData } from "./get-data";
import { urlToSpec } from "../../lib/search";
import { getSearchTitle } from "./utils";

export default {
  data() {
    return {
      title: null,
      headerDescription: null,
      items: null,
      catalogue: null,
      stacks: null,
      spec: null,
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

    this.data = search;
    this.title = getSearchTitle(catalogue);
    this.items = this.data.search.edges.map((edge) => edge.node);

    if (catalogue && catalogue.searchPage) {
      const description = catalogue.components?.find((c) => c.name === "Brief");
      const stacks = catalogue.searchPage.components?.find(
        (c) => c.name === "Stackable content"
      )?.content?.items;

      this.metaDescription = toText(description.content.json);
      this.headerDescription = description.content.json;
      this.stacks = stacks;
    }
  },
  head() {
    if (!this.metaDescription) {
      console.warn("this.metaDescription is missing for search");
    }

    return {
      title: getSearchTitle(this.catalogue),
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
