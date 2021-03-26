<template>
  <div class="facets">
    <!--
      We pass custom variable values to the Button components
      so we don't have to deal with specificity issues
      that can only be solved with !important.
      -->
    <ButtonOpenFacets
      @click="toggleFacets"
      :aria-label="
        isOpen ? $t('search.facets.close') : $t('search.facets.open')
      "
    >
      {{ isOpen ? $t("common.close") : $t("search.filter") }}
    </ButtonOpenFacets>
    <div
      class="facets__displayer"
      :class="isOpen ? 'facets__displayer--is-open' : ''"
    >
      <FacetGroup :title="$t('search.facets.price.title')">
        <template v-slot:action>
          <FaceGroupAction @click="$emit('reset-price-facet')">
            {{ $t("search.facets.reset") }}
          </FaceGroupAction>
        </template>
        <template v-slot:children>
          <!--
            @TODO: If we modify first the max field, everything goes OK.
            If we modify the min price first, the components gets buggy
          -->
          <FacetPrice
            :min="aggregations.price.min"
            :max="aggregations.price.max"
            :value="facetPriceValue"
            @on-price-change="(params) => $emit('on-price-change', params)"
          />
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
              {{ $t("search.facets.reset") }}
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
                :isChecked="
                  isAttributeValueChecked({
                    attribute: attrGroup.attribute,
                    value: attrGroupValue.value,
                  })
                "
                @on-change="
                  ({ value, isChecked }) =>
                    $emit('on-change-attribute-facet', {
                      attribute: attrGroup.attribute,
                      value,
                      isChecked,
                    })
                "
              />
            </div>
          </template>
        </FacetGroup>
      </template>

      <footer class="facets__displayer-close">
        <Button @click="closeFacets" class="facets__displayer-close-button">
          {{
            $t("search.facets.viewNResults", {
              count: this.totalResults,
            })
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
import FacetPrice from "./price";

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
    FacetPrice,
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
    const { priceRange } = this.filter.productVariants;

    return {
      isOpen: false,
      attributeGroupAggregations: getAttributeGroups(this.aggregations),
      facetPriceValue: {
        min: this.aggregations.price.min,
        max: this.aggregations.price.max,
        ...priceRange,
      },
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
    /*
     * Checks if a value for an attribute is checked or not.
     */
    isAttributeValueChecked: function ({ attribute, value }) {
      return Boolean(
        this.filter?.productVariants?.attributes?.some(
          (attr) => attr.attribute === attribute && attr.values.includes(value)
        )
      );
    },
  },
  watch: {
    filter: {
      deep: true,
      handler: function (newfilter) {
        const { priceRange } = newfilter.productVariants;
        this.facetPriceValue = {
          min: this.aggregations.price.min,
          max: this.aggregations.price.max,
          ...priceRange,
        };
      },
    },
    aggregations: {
      deep: true,
      handler: function (newAggregations) {
        this.facetPriceValue = {
          min: newAggregations.price.min,
          max: newAggregations.price.max,
          ...this.filter.productVariants.priceRange,
        };
      },
    },
  },
};
</script>

<style src='./index.css'></style>
