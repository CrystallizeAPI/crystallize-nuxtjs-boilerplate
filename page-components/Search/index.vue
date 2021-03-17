<template>
  <FetchLoader :state="$fetchState">
    <Container class="search-page">
      <PageHeader :title="title" :description="headerDescription" />
      <main>
        <div class="search-page__actions">
          <Facets
            :totalResults="items.length"
            :aggregations="aggregations"
            @reset-attibute-facet="resetAttributeFacet"
            @reset-price-facet="resetPriceFacet"
          />
          <OrderBy
            class="search-page__actions-right"
            :orderBy="orderBy"
            @on-change="handleOrderByChange"
          />
        </div>
        <span v-if="items.length > 0" class="search-page__counter">
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
  watchQuery: true,
  data: function () {
    return {
      title: null,
      headerDescription: null,
      items: [],
      catalogue: null,
      stacks: null,
      orderBy: {},
      aggregations: {},
      totalResults: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];
    const asPath = route.path;
    const spec = urlToSpec({ query: route.query, asPath }, locale);
    const {
      query: { catalogue: catalogueFromQuery, ...rest },
    } = route;

    const { search, catalogue } = await getSearchData({
      asPath,
      preview: null,
      language: locale.crystallizeCatalogueLanguage,
      searchSpec: { ...urlToSpec({ query: rest, asPath }, locale) },
    });

    this.title = getSearchTitle(catalogue);
    this.items = search.search.edges.map((edge) => edge.node);
    this.orderBy = spec.orderBy;
    this.aggregations = search.aggregations;

    if (catalogue && catalogue.searchPage) {
      const description = catalogue.searchPage.components?.find(
        (c) => c.name === "Brief"
      );
      const stacks = catalogue.searchPage.components?.find(
        (c) => c.name === "Stackable content"
      )?.content?.items;

      if (description) {
        this.metaDescription = toText(description?.content?.json);
        this.headerDescription = description?.content?.json;
      }
      this.stacks = stacks;
    }
  },
  methods: {
    getCurrentQuery: function () {
      const { route } = this.$nuxt.context;
      const { query } = route;
      /*
       * We need to extract the [...catalogue] query params
       * in order to get a clean set of query params to work with
       */
      const { catalogue, ...queryWithoutRouteInfo } = query;
      return queryWithoutRouteInfo;
    },
    handleOrderByChange: function ({ optionSelected }) {
      const { route } = this.$nuxt.context;
      const { path: asPath } = route;

      // cache in a variable the execution of this.getCurrentQuery
      const currentQuery = this.getCurrentQuery();
      if (optionSelected.isDefault) {
        /*
         * If the selected "orderBy" option is the default,
         * we remove any existing orderBy value, so we make sure
         * no value is provided in the query object
         */
        const { orderby, ...restQuery } = currentQuery;
        this.$router.replace({ path: asPath, query: restQuery });
        return;
      }

      this.$router.replace({
        path: asPath,
        query: { ...currentQuery, orderby: optionSelected.value },
      });
    },
    resetAttributeFacet: function (e) {
      console.log(e);
    },
    resetPriceFacet: function (e) {
      console.log(e);
    },
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
  watch: {
    /*
     * We fetch again for new items and update the orderBy and the filters.
     */
    "$route.query": async function () {
      const { route } = this.$nuxt.context;
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];
      const asPath = route.path;
      const {
        query: { catalogue: catalogueFromQuery, ...rest },
      } = route;

      const { search } = await getSearchData({
        asPath,
        preview: null,
        language: locale.crystallizeCatalogueLanguage,
        searchSpec: { ...urlToSpec({ query: rest, asPath }, locale) },
      });
      const { ordeBy } = urlToSpec({ query: route.query, asPath }, locale);
      this.items = search.search.edges.map((edge) => edge.node);
      this.orderBy = ordeBy;
    },
  },
};
</script>

<style src='./index.css'></style>
