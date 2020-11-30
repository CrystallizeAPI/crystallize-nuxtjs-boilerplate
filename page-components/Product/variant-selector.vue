<template>
  <div>
    <div v-for="attr in attrs" :key="attr.attribute" class="attr">
      <Button
        v-for="value in attr.values"
        :key="value"
        :class="isSelected(attr, value) ? 'secondary' : ''"
        @click="setVariant(attr, value)"
      >
        {{ value }}
      </Button>
    </div>
  </div>
</template>

<script>
import isEqual from "lodash/isEqual";

function getAttributesFromVariants(variants) {
  return variants.reduce((acc, variant) => {
    variant.attributes.forEach(({ attribute, value }) => {
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
      const { attribute } = attr;

      const selectedAttributes = attributesToObject(this.selectedVariant);
      selectedAttributes[attribute] = value;

      // Get the most suitable variant
      let variant = this.variants.find((variant) => {
        if (isEqual(selectedAttributes, attributesToObject(variant))) {
          return true;
        }
        return false;
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
.attr {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.attr >>> .button .inner {
  border-color: transparent;
}

.attr >>> .button.secondary:hover .inner {
  background: var(--color-text-main);
  color: var(--color-main-background);
}

.attr >>> .button .inner::first-letter {
  text-transform: uppercase;
}
</style>
