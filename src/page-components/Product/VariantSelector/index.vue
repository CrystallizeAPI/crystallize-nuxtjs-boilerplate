<template>
  <div class="variant-selector">
    <div
      v-for="attr in attributes"
      :key="attr.attribute"
      class="variant-selector__attribute"
    >
      <h4 class="variant-selector__title">{{ attr.attribute }}</h4>
      <div class="variant-selector__button-list">
        <VariantButton
          v-for="value in attr.values"
          :key="value"
          :isSelected="isSelectedAttributeValue(value, attr.attribute)"
          :attributeName="attr.attribute"
          :value="value"
          @selectVariant="onAttributeSelect"
          :image="
            getVariantImage({
              variants,
              selectedVariant,
              attributeName: attr.attribute,
              value,
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import VariantButton from "./button";
import isEqual from "lodash/isEqual";
import { getAttributesFromVariants, attributesToObject } from "./utils";

export default {
  components: {
    VariantButton,
  },
  props: {
    selectedVariant: {
      type: Object,
      required: true,
      default: null,
    },
    variants: {
      type: Array,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      attributes: getAttributesFromVariants(this.variants),
    };
  },
  methods: {
    onVariantChange(variant) {
      this.$emit("on-change", variant);
    },
    isSelected(attr, value) {
      const s = this.selectedVariant;
      return s.attributes.find(
        (a) => a.name === attr.name && a.value === value
      );
    },
    getVariantImage: function ({
      variants,
      selectedVariant,
      attributeName,
      value,
    }) {
      const selectedAttributes = attributesToObject(selectedVariant);
      selectedAttributes[attributeName] = value;

      // Get the most suitable variant
      const mostSuitableVariant = variants.find((variant) =>
        isEqual(selectedAttributes, attributesToObject(variant))
      );

      const [firstImage] = mostSuitableVariant?.images || [];
      return firstImage;
    },
    isSelectedAttributeValue: function (value, attributeName) {
      const selectedAttribute = this.getSelectedAttributeFromSelectedVariant(
        attributeName
      );

      return value === selectedAttribute?.value;
    },
    getSelectedAttributeFromSelectedVariant: function (attributeName) {
      return this.selectedVariant.attributes.find(
        (a) => a.attribute === attributeName
      );
    },
    onAttributeSelect: function (attributeName, value) {
      const selectedAttributes = attributesToObject(this.selectedVariant);
      selectedAttributes[attributeName] = value;

      // Get the most suitable variant
      let variant = this.variants.find((variant) =>
        isEqual(selectedAttributes, attributesToObject(variant))
      );

      /**
       * No variant matches all attributes. Let's select the first one
       * that matches just the new set
       */
      if (!variant) {
        variant = this.variants.find((variant) =>
          variant.attributes.some(
            (a) => a.attribute === attributeName && a.value === value
          )
        );
      }

      this.onVariantChange(variant);
    },
  },
};
</script>

<style scoped src='./index.css'></style>
