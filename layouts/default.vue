<template>
  <div>
    <Header :catalogue="catalogue" :fetch-state="$fetchState" />
    <nuxt />
    <Footer :catalogue="catalogue" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import { simplyFetchFromGraph } from "../lib/graph";

export default {
  data() {
    return { catalogue: {} };
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Getting the top level catalogue items
     * to show in the header and footer
     */
    const { data } = await simplyFetchFromGraph({
      query: `
        query GET_NAV_ITEMS($language: String!) {
          catalogue(language: $language) {
            children {
              id
              name
            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    /**
     * Filter out some items
     */
    this.catalogue = data.catalogue.children.filter(
      (c) => c.name !== "_web-frontpage"
    );
  },
};
</script>
