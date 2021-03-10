import { simplyFetchFromSearchGraph, simplyFetchFromGraph } from "../../lib/graph";
import { CATALOGUE_SEARCH_QUERY } from '/lib/search';
import { SEARCH_PAGE_QUERY } from './query'

function cleanFilterForTotalAggregations(filter) {
  const newFilter = filter

  delete newFilter.productVariants.priceRange;
  delete newFilter.productVariants.attributes;

  return newFilter
}

export async function getData({ asPath, preview, language, searchSpec }) {
  const [searchQueryResponse, catalogueQueryResponse] = await Promise.all([
    simplyFetchFromSearchGraph({
      query: CATALOGUE_SEARCH_QUERY,
      variables: {
        ...searchSpec,
        aggregationsFilter: cleanFilterForTotalAggregations(searchSpec.filter)
      }
    }),
    asPath
      ? simplyFetchFromGraph({
        query: SEARCH_PAGE_QUERY,
        variables: {
          path: asPath,
          language,
          version: preview ? 'draft' : 'published'
        }
      })
      : {}
  ]);

  if (!searchQueryResponse.data) {
    return {
      search: null,
      catalogue: null,
      language
    };
  }

  const {
    search,
    aggregations: { aggregations } = {}
  } = searchQueryResponse.data;

  return {
    search: {
      search,
      aggregations
    },
    catalogue: catalogueQueryResponse.data || null,
    language
  };
}