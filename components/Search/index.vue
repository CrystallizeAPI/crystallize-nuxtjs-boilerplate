<template>
  <!--
    The shorthand for :v-on is @. For example:
    - Instead of <button v-on:click="functionName">
    - We can do <button @:click="functionName">
  -->
  <div>
    <IconButton
      screenReaderText="search"
      iconSrc="/icons/search.svg"
      @click="this.toggleSearch"
    />
    <div
      class="search__view"
      :class="isSearchFormVisible ? 'search__view--opened' : ''"
    >
      <!--
        We use aria-hidden to avoid screen readers to read content
        that is only for persentational purposes.
      -->
      <div
        v-if="isSearchFormVisible"
        class="search__overlay"
        aria-hidden="true"
      />
      <div class="search__close-button">
        <CloseButton
          @click="this.toggleSearch"
          screenReaderText="close search"
        />
      </div>
      <div class="search__form">
        <Container>
          <form
            class="search__form-inner"
            v-on:submit="onSearchSubmit"
            :aria-label="$t('common.search.label')"
            role="search"
          >
            <label class="search__label" for="site-search">
              {{ $t("common.search.placeholder") }}
            </label>
            <div class="search__input-wrapper">
              <Spinner
                v-if="status === 'searching'"
                class="search__input-spinner"
              />
              <input
                id="site-search"
                ref="search__input"
                class="search__input"
                type="search"
                :placeholder="$t('common.search.placeholder')"
                v-model="searchTerm"
                v-on:keyup.esc="closeSearch"
                tabindex="0"
              />
              <button
                class="search__submit"
                :aria-label="$t('common.search.submit')"
              >
                ➔
              </button>
            </div>
          </form>
          <!-- sugestions from the form -->
          <div class="search__suggestions" v-if="itemsSuggested">
            <h3 class="search__suggestions-title">suggestions</h3>
            <ul class="search__suggestions-list">
              <li
                @click="handleClickOnSearchSuggestionItem"
                class="search__suggestions-list-element"
                v-for="edge in itemsSuggested"
              >
                <NuxtLink
                  class="search__suggestions-list-element-link"
                  :to="edge.node.path"
                >
                  {{ edge.node.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import { CATALOGUE_SEARCH_QUERY } from "/lib/search";
import { simplyFetchFromSearchGraph } from "/lib/graph";

const SEARCH_STATUS = {
  searching: "searching",
  idle: "idle",
  fetched: "fetched",
};

export default {
  data: function () {
    return {
      status: SEARCH_STATUS.idle,
      searchTerm: "",
      isSearchFormVisible: false,
      itemsSuggested: null,
    };
  },
  methods: {
    /*
     * Toggle the Search form
     */
    toggleSearch: function () {
      const isOpen = !this.isSearchFormVisible;
      this.isSearchFormVisible = isOpen;
      if (isOpen) {
        this.$refs.search__input.focus();
      }
    },
    closeSearch: function () {
      this.toggleSearch();
    },
    resetForm: function () {
      this.searchTerm = "";
      this.deleteSearchSuggestions();
    },
    deleteSearchSuggestions: function () {
      this.itemsSuggested = null;
    },
    handleClickOnSearchSuggestionItem: function () {
      this.closeSearch();
      this.resetForm();
    },
    onSearchSubmit: function (e) {
      e.preventDefault();
      this.searchOnSearchPage({ searchTerm: this.searchTerm });
    },
    searchOnSearchPage: function ({ searchTerm }) {
      if (searchTerm && searchTerm.length > 0) {
        this.closeSearch();
        /*
         * We reset the form so the next time we open
         * the search modal, the input will be clear.
         */
        this.resetForm();
        if (this.$router.path === "/search") {
          return this.$router.replace({
            path: "/search",
            query: { searchTerm },
          });
        }

        this.$router.push({ path: "/search", query: { searchTerm } });
      }
    },
    retrieveSearchSuggestions: async function ({ searchTerm }) {
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];
      const language = locale.crystallizeCatalogueLanguage;
      const filter = { searchTerm, productVariants: { isDefault: true } };

      return simplyFetchFromSearchGraph({
        query: CATALOGUE_SEARCH_QUERY,
        variables: { filter, language, aggregationsFilter: filter },
      });
    },
  },
  watch: {
    /*
     * We don't need to get the new value of searchTerm as the parameter received by
     * by the function because we're using a model. Models are always updated,
     * but we use the watch as a way to know when it happens and execute side effects.
     */
    searchTerm: function () {
      if (this.searchTerm === "") {
        /*
         * If the search term is empty, we remove the items reco
         */
        this.deleteSearchSuggestions();
        return;
      }

      this.status = SEARCH_STATUS.searching;
      this.retrieveSearchSuggestions({ searchTerm: this.searchTerm }).then(
        ({ data }) => {
          const itemsSuggested = data.search.edges;
          this.itemsSuggested = itemsSuggested;
          this.status = SEARCH_STATUS.fetched;
        }
      );
    },
  },
};
</script>

<style scoped src='./index.css'></style>