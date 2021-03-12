<template>
  <FetchLoader :state="$fetchState">
    <Container class="search-page">
      <PageHeader :title="title" :description="headerDescription" />
      <main>
        <span v-if="items" class="search-page__counter">
          Found {{ items.length }} matching results
        </span>
        <CrystallizeCatalogueItems v-if="items" :items="items" />
      </main>
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
    const {
      query: { catalogue: catalogueFromQuery, ...rest },
    } = route;

    const { search, catalogue } = await getSearchData({
      asPath,
      preview: null,
      language: locale.crystallizeCatalogueLanguage,
      searchSpec: { ...urlToSpec({ query: rest, asPath }, locale) },
    });

    this.data = search;
    this.title = getSearchTitle(catalogue);
    this.items = this.data.search.edges.map((edge) => edge.node);

    if (catalogue && catalogue.searchPage) {
      const description = catalogue.components?.find((c) => c.name === "Brief");
      const stacks = catalogue.searchPage.components?.find(
        (c) => c.name === "Stackable content"
      )?.content?.items;

      if (description) {
        this.metaDescription = toText(description.content.json);
        this.headerDescription = description.content.json;
      }
      this.stacks = stacks;
    }
  },
  watch: {
    
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
