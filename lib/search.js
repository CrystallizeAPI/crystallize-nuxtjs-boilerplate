export const CATALOGUE_SEARCH_QUERY = `
  query CATALOGUE_SEARCH (
    $first: Int
    $after: String
    $orderBy: OrderBy
    $language: String
    $filter: CatalogueSearchFilter
    $aggregationsFilter: CatalogueSearchFilter
  ) {
    aggregations: search(
      filter: $aggregationsFilter
      language: $language
    ) {
      aggregations {
        price {
          min
          max
        }
        variantAttributes {
          attribute
          value
          count
        }
      }
    }

    search (
      first: $first
      after: $after
      orderBy: $orderBy
      filter: $filter
      language: $language
    ) {
      aggregations {
        totalResults
      }
      pageInfo {
        totalNodes
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          path
          type
          ... on Product {
            topics {
              id
              name
            }
            matchingVariant {
              priceVariants {
                identifier
                name
                currency
                price
              }
              images {
                url
                variants {
                  width
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

/*
 * We assume that the first option is the one that will be the default option
 */
export const orderByOptions = [
  {
    field: 'ITEM_NAME',
    direction: 'ASC'
  },
  {
    field: 'ITEM_NAME',
    direction: 'DESC'
  },
  {
    field: 'PRICE',
    direction: 'ASC'
  },
  {
    field: 'PRICE',
    direction: 'DESC'
  },
  {
    field: 'STOCK',
    direction: 'ASC'
  },
  {
    field: 'STOCK',
    direction: 'DESC'
  }
].map((o) => ({ value: `${o.field}_${o.direction}`, ...o }));

export const defaultSpec = {
  first: 25,
  orderBy: {
    field: orderByOptions[0].field,
    direction: orderByOptions[0].direction
  },
  filter: {
    priceVariant: 'default'
  },
  include: {}
};

function getClonedObject(obj) {
  return { ...obj }
}

export function urlToSpec({ query = {}, asPath }, locale) {
  let spec = getClonedObject(defaultSpec)
  function handleSingleAttribute(attr) {
    const [attribute, valuesAsString] = attr.split(':');
    const values = valuesAsString.split(',');
    spec.filter.productVariants.attributes.push({
      attribute,
      values
    });
  }

  spec.filter.priceVariant = locale.crystallizePriceVariant;

  spec.language = locale.crystallizeCatalogueLanguage;

  spec.filter.productVariants = {};

  if (asPath) {
    const path = asPath.split('?')[0];
    if (path !== '/search') {
      if (!spec.filter.include) {
        spec.filter.include = {};
      }

      // Category page. Only show products
      spec.filter.type = 'PRODUCT';

      // Only find products under this path (ex: /shop/chairs)
      spec.filter.include.paths = [path];

      // Only present the default product variants
      spec.filter.productVariants.isDefault = true;
    } else {
      delete spec.filter.include;
    }
  }

  if (query.attrs) {
    spec.filter.productVariants.attributes = [];
    if (Array.isArray(query.attrs)) {
      query.attrs.forEach(handleSingleAttribute);
    } else {
      handleSingleAttribute(query.attrs);
    }
  }

  const min = parseFloat(query.min, 10);
  const max = parseFloat(query.max, 10);
  if (!isNaN(min) || !isNaN(max)) {
    const priceRange = {};
    if (!isNaN(min)) {
      priceRange.min = min;
    }
    if (!isNaN(max)) {
      priceRange.max = max;
    }
    spec.filter.productVariants.priceRange = priceRange;
  }

  const first = parseInt(query.first, 10);
  if (!isNaN(first)) {
    spec.first = first;
  }

  if (query.before) {
    spec.before = query.before;
  }

  if (query.after) {
    spec.after = query.after;
  }

  const orderBy = orderByOptions.find((o) => o.value === query.orderby);
  if (orderBy) {
    spec.orderBy = { direction: orderBy.direction, field: orderBy.field };
  }

  if (query.searchTerm) {
    spec.filter.searchTerm = query.searchTerm;
  }

  return spec;
}
