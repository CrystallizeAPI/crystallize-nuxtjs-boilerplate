<template>
  <FetchLoader :state="$fetchState">
    <Container class="search-page">
      <PageHeader :title="title" :description="headerDescription" />
      <main>
        <div class="search-page__actions">
          <Facets
            :filter="filter"
            :totalResults="items.length"
            :aggregations="aggregations"
            @on-change-attribute-facet="handleFacetAttributeChange"
            @reset-attribute-facet="resetAttributeFacet"
            @reset-price-facet="resetPriceFacet"
          />
          <OrderBy
            class="search-page__actions-right"
            :orderBy="orderBy"
            @on-change="handleChangeOrderBy"
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
import { orderByOptions } from "/lib/search";

function singleAttrToQuery(attr) {
  return `${attr.attribute}:${attr.values.join(",")}`;
}

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
      filter: null,
      totalResults: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];
    const asPath = route.path;
    const { orderBy, filter } = urlToSpec(
      { query: route.query, asPath },
      locale
    );
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
    this.orderBy = orderBy;
    this.filter = filter;
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
    handleChangeOrderBy: function ({ optionSelected }) {
      const { route } = this.$nuxt.context;
      const { path: asPath } = route;

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
        query: {
          ...currentQuery,
          orderby: optionSelected.value,
        },
      });
    },
    handleFacetAttributeChange: function ({ attribute, value, isChecked }) {
      // Create a copy of the attributes for inmutability purposes.
      const attrs = [...(this.filter?.productVariants?.attributes || [])];

      // We look for the attribute that has changed.
      const existingAttr = attrs.find((attr) => attr.attribute === attribute);

      if (!existingAttr) {
        // If there's no existing element, we create a new enty for that attribute
        attrs.push({ attribute, values: [value] });
      } else {
        /*
         * If the element has been CHECKED, we add it into the current
         * collection of values for that attribute.
         * If the element been UNCHECKED, we remove it from the current collection.
         */
        isChecked
          ? existingAttr.values.push(value)
          : existingAttr.values.splice(existingAttr.values.indexOf(value), 1);
      }

      // We remove the values that are empty arrays
      const newAttrsFiltered = attrs.filter(({ values }) => values.length > 0);

      const { route } = this.$nuxt.context;
      const currentQuery = this.getCurrentQuery();

      // Check if the new query will need attributes
      const hasToIncludeAttributeInQuery =
        newAttrsFiltered && newAttrsFiltered.length > 0;

      if (!hasToIncludeAttributeInQuery) {
        const { attrs, queryWithoutAttr } = currentQuery;
        this.$router.replace({ path: route.path, query: queryWithoutAttr });
        return;
      }

      let newQueryAttributes = newAttrsFiltered.map(singleAttrToQuery);
      if (newQueryAttributes.length === 1) {
        newQueryAttributes = newQueryAttributes[0];
      }

      /*
       * @TODO: If there are more than 2 attributes, between elements the ","
       * character is not parsed. Even though it works, that's not the same
       * behavior as the NextJS boilerplate.
       */
      this.$router.replace({
        path: route.path,
        query: { ...currentQuery, attrs: newQueryAttributes },
      });
    },
    /*
     * Reset a single facet
     */
    resetAttributeFacet: function ({ attribute }) {
      const { route } = this.$nuxt.context;
      const currentQuery = this.getCurrentQuery();
      const {
        attrs: attributesInCurrentQuery,
        queryWithoutAttributes,
      } = currentQuery;
      /*
       * If the attributes key on the query object, is not an array, we just remove it.
       */
      if (!Array.isArray(attributesInCurrentQuery)) {
        this.$router.replace({
          path: route.path,
          query: queryWithoutAttributes,
        });
        return;
      }

      /*
       * In case of being an array, we'll remove the matching attribute
       * from the attributes we currently have in the query object
       */
      const index = attributesInCurrentQuery.findIndex((a) =>
        a.startsWith(`${attribute}:`)
      );
      attributesInCurrentQuery.splice(index, 1);

      /*
       * We create a new query with the partial of the currentQuery that
       * we got from extracting the attributes, and the attributes we got after
       * removing the attribute we had to reset.
       */
      const queryWithAttributesReset = {
        ...queryWithoutAttributes,
        attrs: attributesInCurrentQuery,
      };
      this.$router.replace({
        path: route.path,
        query: queryWithAttributesReset,
      });
    },
    /*
     * Reset the Price Facet
     */
    resetPriceFacet: function (e) {
      const { min, max, ...queryWithPriceReset } = this.getCurrentQuery();
      const { route } = this.$nuxt.context;
      this.$router.replace({ path: route.path, query: queryWithPriceReset });
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

      const { ordeBy, filter } = urlToSpec(
        { query: route.query, asPath },
        locale
      );
      this.items = search.search.edges.map((edge) => edge.node);
      const orderByActive = orderByOptions.find(
        (option) => option.value === orderBy
      );
      this.orderBy = orderByActive;
      this.filter = filter;
    },
  },
};
</script>

<style src='./index.css'></style>
