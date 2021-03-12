<template>
  <div class="facets">
    <!--
      We pass custom variable values to the Button components
      so we don't have to deal with specificity issues
      that can only be solved with !important.
      -->
    <Button
      @click="toggleFacets"
      class="facets__button"
      :aria-label="isOpen ? 'Close filters' : 'Open filters'"
      :style="{
        '--color-background': 'white',
        '--color-text': 'var(--color-primary-action-content)',
        '--color-background-hover': '#f7f7f7',
        '--color-text-hover': 'var(--color-primary-action-content)',
      }"
    >
      {{ this.isOpen ? "Close" : "Filter" }}
      <img src="/icons/filters.svg" alt="" aria-hidden="true" />
    </Button>
    <div
      class="facets__displayer"
      :class="isOpen ? 'facets__displayer--is-open' : ''"
    >
      working
      <footer class="facets__displayer-close">
        <Button @click="closeFacets" class="facets__displayer-close-button">
          {{
            this.totalResults > 0
              ? `Show ${totalResults} results`
              : "show results"
          }}
        </Button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalResults: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleFacets: function () {
      this.isOpen ? this.closeFacets() : this.openFacets();
    },
    closeFacets: function () {
      this.isOpen = false;
    },
    openFacets: function () {
      this.isOpen = true;
    },
  },
};
</script>

<style src='./index.css'></style>
