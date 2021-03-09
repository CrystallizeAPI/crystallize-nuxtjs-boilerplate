<template>
  <div class="variant-selector">
    <div
      v-for="attributeName in Object.keys(attrs)"
      :key="attributeName.attribute"
      class="variant-selector__attribute"
    >
      <h4 class="variant-selector__title">{{ attributeName.attribute }}</h4>
      <div class="variant-selector__button-list">
        <VariantButton
          v-for="value in attributeName.values"
          :key="value"
          :isSelected="isSelectedVariant(attributeName, value)"
          :attr="attributeName"
          :value="value"
          @selectVariant="onAttributeSelect"
          :image="
            getVariantImage({
              variants,
              selectedVariant,
              attributeName: attributeName.attribute,
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
      attrs: getAttributesFromVariants(this.variants),
    };
  },
  methods: {
    setVariant(variant) {
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
    isSelectedVariant: function (attr, value) {
      console.log(this.isSelected(attr, value));
    },
    onAttributeSelect: function (attribute, value) {
      const selectedAttributes = attributesToObject(this.selectedVariant);
      selectedAttributes[attribute] = value;

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
            (a) => a.attribute === attribute && a.value === value
          )
        );
      }

      if (variant) {
        this.setVariant(attribute, value);
      }
    },
  },
};
</script>

<style scoped src='./index.css'></style>
