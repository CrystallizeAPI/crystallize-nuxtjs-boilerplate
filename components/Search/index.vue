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
      @click="this.handleClick"
    />
    <div class="search__view">
      <div class="search__overlay" />
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
            <button class="search__submit" aria-label="submit search">
              hi
            </button>
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
    handleClick: function (e) {
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