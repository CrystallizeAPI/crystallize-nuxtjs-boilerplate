<template>
  <FetchLoader :state="$fetchState">
    <Container class="search-page">
      <PageHeader :title="title" :description="headerDescription" />
      <main>
        <div class="search-page__actions">
          <Facets
            :filter="filter"
            :totalResults="totalResults"
            :aggregations="aggregations"
            @on-change-attribute-facet="handleFacetAttributeChange"
            @on-price-change="handleFacetPriceChange"
            @reset-attribute-facet="resetAttributeFacet"
            @reset-price-facet="resetPriceFacet"
          />
          <OrderBy
            class="search-page__actions-right"
            :orderBy="orderBy"
            @on-change="handleChangeOrderBy"
          />
        </div>
        <span v-if="totalResults" class="search-page__counter">
          Found {{ this.totalResults }} matching results
        </span>
        <CrystallizeCatalogueItems v-if="items" :items="items" />
        <Pagination
          @pagination-change="handleChangeNavigation"
          :hasPreviousPage="pagination.hasPreviousPage"
          :hasNextPage="pagination.hasNextPage"
        />
      </main>
    </Container>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getSearchData } from "./get-data";
import { urlToSpec } from "../../lib/search";
import { getSearchTitle, cleanFilterForTotalAggregations } from "./utils";
import { orderByOptions } from "/lib/search";
import { PAGINATION_DIRECTION } from "../../components/Pagination/utils";

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
      pagination: {
        hasPreviousPage: null,
        hasNextPage: null,
        startCursor: null,
        endCursor: null,
      },
    };
  },
  fetch: async function () {
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

    const searchSpec = { ...urlToSpec({ query: rest, asPath }, locale) };
    const { search, catalogue } = await getSearchData({
      asPath,
      preview: null,
      language: locale.crystallizeCatalogueLanguage,
      searchSpec,
      aggregationsFilter: cleanFilterForTotalAggregations(searchSpec.filter),
    });

    this.title = getSearchTitle(catalogue);
    this.filter = filter;
    this.aggregations = search.aggregations;
    this.totalResults = search.search.aggregations.totalResults;
    this.orderBy = orderBy;
    this.items = search.search.edges.map((edge) => edge.node);
    this.pagination = {
      hasPreviousPage: search.search.pageInfo.hasPreviousPage,
      hasNextPage: search.search.pageInfo.hasNextPage,
      startCursor: search.search.pageInfo.startCursor,
      endCursor: search.search.pageInfo.endCursor,
    };

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
      const currentQuery = this.getCurrentQuery();
      if (optionSelected.isDefault) {
        /*
         * If the selected "orderBy" option is the default,
         * we remove any existing orderBy value, so we make sure
         * no value is provided in the query object
         */

        const { orderby, ...restQuery } = currentQuery;
        this.updateSearchURLForQuery(restQuery);
        return;
      }

      this.updateSearchURLForQuery({
        ...currentQuery,
        orderby: optionSelected.value,
      });
    },
    updateSearchURLForQuery: function (query = {}) {
      const { catalogue, ...queryWithoutRouteInfo } = query;
      /*
       * We use URLSearchParams because it will deal with the codification
       * and the query strings that have more than one value for a key.
       */
      const queryAsString =
        new URLSearchParams(queryWithoutRouteInfo).toString() || "";
      const { route } = this.$nuxt.context;
      const { path } = route;
      const newPath = queryAsString ? `?${queryAsString}` : path;

      this.$router.replace({ path: newPath });
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

      const currentQuery = this.getCurrentQuery();

      // Check if the new query will need attributes
      const hasToIncludeAttributeInQuery =
        newAttrsFiltered && newAttrsFiltered.length > 0;

      if (!hasToIncludeAttributeInQuery) {
        const { attrs, queryWithoutAttr } = currentQuery;
        this.updateSearchURLForQuery(queryWithoutAttr);
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
      const newQuery = { ...currentQuery, attrs: newQueryAttributes };
      this.updateSearchURLForQuery(newQuery);
    },
    /*
     * Reset a single facet
     */
    resetAttributeFacet: function ({ attribute }) {
      /*
       * @TODO: getCurrentQuery() is always one step behind because it
       * uses the URL as source of truth. For most of the use cases it's
       * not a problem, but when we want to reset a facet, it is because
       * it has the old state.
       */
      const currentQuery = this.getCurrentQuery();
      const {
        attrs: attributesInCurrentQuery,
        queryWithoutAttributes,
      } = currentQuery;

      /*
       * If the attributes key on the query object, is not an array, we just remove it.
       */
      if (!Array.isArray(attributesInCurrentQuery)) {
        this.updateSearchURLForQuery(queryWithoutAttributes);
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

      this.updateSearchURLForQuery(queryWithAttributesReset);
    },
    /*
     * Reset the Price Facet
     */
    resetPriceFacet: function (e) {
      const { min, max, ...queryWithPriceReset } = this.getCurrentQuery();
      this.updateSearchURLForQuery(queryWithPriceReset);
    },
    /*
     * when someone clicks on previous/next page
     */
    handleChangeNavigation: function ({ direction }) {
      if (direction === PAGINATION_DIRECTION.previous) {
        return this.updateSearchURLForQuery({
          ...this.getCurrentQuery(),
          before: this.pagination.startCursor,
        });
      }

      if (direction === PAGINATION_DIRECTION.next) {
        return this.updateSearchURLForQuery({
          ...this.getCurrentQuery(),
          after: this.pagination.endCursor,
        });
      }

      throw new Error("Pagination direction not supported");
    },
    handleFacetPriceChange: function ({ min, max }) {
      const { price } = this.aggregations;

      let priceQueryPartial = {};
      if (min !== price.min) {
        priceQueryPartial.min = min.toString();
      }

      if (max !== price.max) {
        priceQueryPartial.max = max.toString();
      }

      /*
       * JSON.stringify converts a JSON into a string.
       * FYI: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
       *
       * So, if the result of JSON.stringify() is not an empty object,
       * it means that either has "min", "max", or both values
       */
      if (JSON.stringify(priceQueryPartial) !== "{}") {
        /*
         *
         */
        this.updateSearchURLForQuery({
          ...this.getCurrentQuery(),
          ...priceQueryPartial,
        });
      }
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

      const searchSpec = { ...urlToSpec({ query: rest, asPath }, locale) };
      const { search } = await getSearchData({
        asPath,
        preview: null,
        language: locale.crystallizeCatalogueLanguage,
        searchSpec: searchSpec,
        aggregationsFilter: cleanFilterForTotalAggregations(searchSpec.filter),
      });

      this.items = search.search.edges.map((edge) => edge.node);
      this.totalResults = search.search.aggregations.totalResults;
      const orderByActive = orderByOptions.find(
        (option) => option.value === searchSpec.orderBy
      );
      this.orderBy = orderByActive;
      this.filter = searchSpec.filter;
    },
  },
};
</script>

<style src='./index.css'></style>
