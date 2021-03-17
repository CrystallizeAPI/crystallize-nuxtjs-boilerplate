<template>
  <div class="facets">
    <!--
      We pass custom variable values to the Button components
      so we don't have to deal with specificity issues
      that can only be solved with !important.
      -->
    <ButtonOpenFacets @click="toggleFacets">
      {{ this.isOpen ? "Close" : "Filter" }}
    </ButtonOpenFacets>
    <div
      class="facets__displayer"
      :class="isOpen ? 'facets__displayer--is-open' : ''"
    >
      <FacetGroup title="Price">
        <template v-slot:action>
          <FaceGroupAction @click="resetPriceFacet">Reset</FaceGroupAction>
        </template>
        <template v-slot:children>
          here goes a nice price slider similar to NextJS boilerplate
        </template>
      </FacetGroup>

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
import ButtonOpenFacets from "./toggle-facets";
import FacetGroup from "./group";
import FaceGroupAction from "./action";

export default {
  components: {
    ButtonOpenFacets,
    FacetGroup,
    FaceGroupAction,
  },
  props: {
    totalResults: {
      type: Number,
      required: true,
      default: 0,
    },
    filter: {
      type: Object,
      required: true,
    },
    aggregations: {
      type: Object,
      required: true,
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
    resetPriceFacet: function () {
      alert("reset price facet");
    },
  },
};
</script>

<style src='./index.css'></style>
