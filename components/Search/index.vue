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
      <form
        class="search__form"
        v-on:submit="onSearchSubmit"
        aria-label="search"
        role="search"
      >
        <Container class="search__form-inner">
          <label class="search__label" for="site-search">Find things</label>
          <div class="search__input-wrapper">
            <input
              id="site-search"
              ref="search__input"
              class="search__input"
              type="search"
              placeholder="Find things"
              v-model="searchTerm"
              v-on:keyup.esc="closeSearch"
              tabindex="0"
            />
            <button class="search__submit" aria-label="submit search">➔</button>
          </div>
        </Container>
      </form>
    </div>
  </div>
</template>

<script>
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
    resetSearchTerm: function () {
      this.searchTerm = "";
    },
    closeSearch: function () {
      this.toggleSearch();
    },
    onSearchSubmit: function (e) {
      e.preventDefault();
      this.showSearchOnSearchPage();
    },
    showSearchOnSearchPage: function () {
      if (this.searchTerm && this.searchTerm.length > 0) {
        this.closeSearch();
        /*
         * We store the current searchTerm value to search for it later on.
         */
        const searchTerm = this.searchTerm;
        /*
         * We reset the searchTerm so the next time we open
         * the search modal, the input will be clear.
         */
        this.resetSearchTerm();
        this.$router.push({
          path: "search",
          query: { searchTerm },
        });
      }
    },
  },
  watch: {
    searchTerm: function (newSearchTerm) {
      this.status = SEARCH_STATUS.searching;
    },
  },
};
</script>

<style scoped src='./index.css'></style>