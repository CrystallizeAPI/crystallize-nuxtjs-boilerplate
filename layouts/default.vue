<template>
  <div>
    <p v-if="$fetchState.pending">Hold on...</p>
    <p v-else-if="$fetchState.error">
      Oh no! There was an error fetching the data in layouts/default.vue
    </p>
    <div v-else>
      <LayoutHeader>
        <template v-slot:navigation>
          <LayoutNavigation :nav-items="navItems" />
        </template>
        <template v-slot:actions>
          <div class="actions">
            <IconButton
              to="/login"
              screenReaderText="login"
              iconSrc="/icons/user.svg" />
            <IconButton
              screenReaderText="search"
              iconSrc="/icons/search.svg" />
            <IconButton
              screenReaderText="basket"
              iconSrc="/icons/basket.svg" />
          </div>
        </template>
      </LayoutHeader>
      <nuxt />
      <LayoutFooter :nav-items="navItems" />
    </div>
  </div>
</template>

<script>
import { simplyFetchFromGraph } from "../lib/graph";

export default {
  data() {
    return { navItems: [] };
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
              path
            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    /**
     * Filter the items you don't want in the nav bar
     */
    this.navItems = data.catalogue.children.filter(
      (c) => !c.name.startsWith("_")
    );
  },
};
</script>

<style scoped>
  .actions {
    display: flex;
  }
</style>