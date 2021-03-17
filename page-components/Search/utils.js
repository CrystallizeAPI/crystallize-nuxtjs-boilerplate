export function getSearchTitle(catalogue) {
  return catalogue?.searchPage?.name || "Search";
}

export function cleanFilterForTotalAggregations(filter = {}) {
  const { productVariants, ...restFilters } = filter
  const { priceRange, attributes, ...restProductvariants } = productVariants

  return {
    ...restFilters,
    productVariants: restProductvariants
  }
}