import { simplyFetchFromSearchGraph, simplyFetchFromGraph } from "/lib/graph";
import { CATALOGUE_SEARCH_QUERY } from '/lib/search';
import { SEARCH_PAGE_QUERY } from './query'

export async function getData({
  asPath,
  preview,
  language,
  searchSpec,
  aggregationsFilter
}) {
  const [searchQueryResponse, catalogueQueryResponse] = await Promise.all([
    simplyFetchFromSearchGraph({
      query: CATALOGUE_SEARCH_QUERY,
      variables: {
        first: searchSpec.first,
        orderBy: searchSpec.orderBy,
        filter: searchSpec.filter,
        include: searchSpec.include,
        language: language,
        aggregationsFilter,
        after: searchSpec.after,
        before: searchSpec.before
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

  /* 
   * We haven't got any response from the Search API
   */
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
    search: { search, aggregations },
    catalogue: catalogueQueryResponse.data || null,
    language
  };
}