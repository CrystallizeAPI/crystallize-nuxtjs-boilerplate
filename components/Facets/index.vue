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
          <FaceGroupAction @click="$emit('reset-price-facet')"
            >Reset</FaceGroupAction
          >
        </template>
        <template v-slot:children>
          here goes a nice price slider similar to NextJS boilerplate
        </template>
      </FacetGroup>

      <template v-if="aggregations">
        <FacetGroup
          v-for="attrGroup in attributeGroupAggregations"
          :title="attrGroup.attribute"
        >
          <template v-slot:action>
            <FaceGroupAction
              @click="
                $emit('reset-attribute-facet', {
                  attribute: attrGroup.attribute,
                })
              "
            >
              Reset
            </FaceGroupAction>
          </template>
          <template v-slot:children>
            <div class="facets__attribute-displayer">
              <FacetCheckbox
                v-for="attrGroupValue in attrGroup.values"
                :key="attrGroupValue.value"
                class="facets__attribute"
                :value="attrGroupValue.value"
                :count="attrGroupValue.count"
                @on-change="handleFacetCheckboxChange"
              />
            </div>
          </template>
        </FacetGroup>
      </template>

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
import FacetCheckbox from "./checkbox";

function getAttributeGroups({ variantAttributes = [] }) {
  const groups = [];

  variantAttributes.forEach(({ attribute, value, count }) => {
    const existingGroup = groups.find((g) => g.attribute === attribute);
    existingGroup
      ? existingGroup.values.push({ value, count })
      : groups.push({ attribute, values: [{ value, count }] });
  });

  return groups;
}

export default {
  components: {
    ButtonOpenFacets,
    FacetGroup,
    FaceGroupAction,
    FacetCheckbox,
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
      attributeGroupAggregations: getAttributeGroups(this.aggregations),
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
    resetPriceFacet: function () {},
    resetAttributeFacet: function ({ attribute }) {
      console.log({ name, attribute });
    },
    isAttributeValueChecked: function ({ name, value }) {},
    handleFacetCheckboxChange: function () {
      console.log("changed");
    },
  },
};
</script>

<style src='./index.css'></style>
