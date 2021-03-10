import { simplyFetchFromGraph } from "../../lib/graph";
import { QUERY_PRODUCT } from "./query";

export async function getData({
  query = QUERY_PRODUCT,
  asPath,
  language
}) {
  return simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: 'published' // @todo: still have to work on this
    },
  });
}