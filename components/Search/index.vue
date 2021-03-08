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
    <div v-if="isSearchViewOpened" class="search__view">
      <!--
        We use aria-hidden to avoid screen readers to read content
        that is only for persentational purposes.
      -->
      <div class="search__overlay" aria-hidden="true" />
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
          <label class="search__label">Find things</label>
          <div class="search__input-wrapper">
            <input
              class="search__input"
              type="search"
              placeholder="Find things"
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
    toggleSearch: function (e) {
      const isOpen = !this.isSearchViewOpened;
      this.isSearchViewOpened = isOpen;
    },
    handleSubmit: function (e) {
      alert("im being submitted");
    },
  },
};
</script>

<style scoped src='./index.css'></style>