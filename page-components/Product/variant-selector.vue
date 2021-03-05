<template>
  <div class="variant-selector">
    <div
      v-for="attr in attrs"
      :key="attr.attribute"
      class="variant-selector__attribute"
    >
      <h4 class="variant-selector__title">{{ attr.attribute }}</h4>
      <div class="variant-selector__button-list">
        <button
          v-for="value in attr.values"
          :key="value"
          class="variant-selector__button"
          :class="isSelected(attr, value) ? 'secondary' : ''"
          @click="setVariant(attr, value)"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import isEqual from "lodash/isEqual";

function getAttributesFromVariants(variants) {
  return variants.reduce((acc, variant) => {
    variant.attributes?.forEach(({ attribute, value }) => {
      const currentAttribute = acc.find((a) => a.attribute === attribute);
      if (!currentAttribute) {
        acc.push({
          attribute,
          values: [value],
        });
      } else {
        const valueExists = currentAttribute.values.find(
          (str) => str === value
        );
        if (!valueExists) {
          currentAttribute.values.push(value);
        }
      }
    });

    return acc;
  }, []);
}

function attributesToObject({ attributes }) {
  return Object.assign(
    {},
    ...attributes.map(({ attribute, value }) => ({ [attribute]: value }))
  );
}

export default {
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
    setVariant(attr, value) {
      /*
       * Attribute is the "group" or "type" of the variant.
       * It can have values like color, frame, material, size, etc.
       */
      const { attribute } = attr;

      const selectedAttributes = attributesToObject(this.selectedVariant);
      selectedAttributes[attribute] = value;

      // Get the most suitable variant
      let variant = this.variants.find((variant) => {
        isEqual(selectedAttributes, attributesToObject(variant));
      });

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
        this.$emit("on-change", variant);
      }
    },
    isSelected(attr, value) {
      const s = this.selectedVariant;
      return s.attributes.find(
        (a) => a.name === attr.name && a.value === value
      );
    },
  },
};
</script>

<style scoped>
.variant-selector {
  margin: 30px 0;
}

.variant-selector__attribute:not(:first-child) {
  margin-top: 1.5rem;
}

.variant-selector__title {
  color: var(--color-text-main);
  font-size: var(--font-size-s);
  margin-bottom: 10px;
}

.variant-selector__button-list {
  display: flex;
}

.variant-selector__button {
  align-items: flex-end;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  justify-content: center;
  padding: 10px 0;
  text-transform: capitalize;
  width: 25%;
}
</style>
