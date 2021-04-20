import { simplyFetchFromGraph } from "/lib/graph";
import { QUERY_PRODUCT } from "./query";

export async function getData({
  query = QUERY_PRODUCT,
  asPath,
  language,
  preview = null
}) {
  return simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    },
  });
}