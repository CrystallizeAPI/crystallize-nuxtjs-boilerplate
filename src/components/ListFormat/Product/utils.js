export function findDefaultVariant(variants) {
  return variants?.find((variant) => variant.isDefault);
}