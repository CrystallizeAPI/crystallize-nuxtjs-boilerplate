import isEqual from "lodash/isEqual";

export function getAttributesFromVariants(variants) {
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

export function attributesToObject({ attributes }) {
  return Object.assign(
    {},
    ...attributes.map(({ attribute, value }) => ({ [attribute]: value }))
  );
}

export function findMostSuitableVariant({ variants, attributes }) {
  return variants.find((variant) =>
    isEqual(attributes, attributesToObject(variant))
  );
}