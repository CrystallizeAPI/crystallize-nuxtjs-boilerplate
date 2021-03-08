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
      :class="isSearchViewOpened ? 'search__view--opened' : ''"
    >
      <!--
        We use aria-hidden to avoid screen readers to read content
        that is only for persentational purposes.
      -->
      <div
        v-if="isSearchViewOpened"
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
        v-on:submit.prevent="handleSubmit"
        aria-label="search"
        role="search"
      >
        <div class="search__form-inner">
          <label class="search__label" for="site-search">Find things</label>
          <div class="search__input-wrapper">
            <input
              id="site-search"
              ref="search__input"
              class="search__input"
              type="search"
              placeholder="Find things"
              v-on:keyup.esc="closeSearch"
              v-on:keyup.enter="handleSubmit"
              tabindex="0"
            />
            <button class="search__submit" aria-label="submit search">➔</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isSearchViewOpened: false,
    };
  },
  methods: {
    toggleSearch: function (event) {
      const isOpen = !this.isSearchViewOpened;
      this.isSearchViewOpened = isOpen;
      if (isOpen) {
        this.$refs.search__input.focus();
      }
    },
    handleSubmit: function (event) {
      alert("search has been submitted! :)");
    },
    closeSearch: function (event) {
      this.toggleSearch();
    },
  },
};
</script>

<style scoped src='./index.css'></style>