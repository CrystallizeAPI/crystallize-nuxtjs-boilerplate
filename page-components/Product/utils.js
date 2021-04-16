export function isSumaryComponent({ name }) {
  return name === 'Summary';
}

export function isDescriptionComponent({ name }) {
  return name === 'Description';
}

export function isSpecsComponent({ name }) {
  return name === 'Specs';
}

export function isRelatedProductsComponent({ name }) {
  return name === 'Related products';
}

export function findDefaultVariant(variants) {
  return variants?.find((variant) => variant.isDefault);
}

/*
 * Since we will render all the components on the body,
 * We want to extract the ones we're rendering explicitly
 * so we don't have duplicated content
 */
export const COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS = ["Specs", "Summary"];