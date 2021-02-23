import { simplyFetchFromGraph } from "../../lib/graph";
import { QUERY_PRODUCT } from "./query";

export async function getProductData({
  query = QUERY_PRODUCT,
  asPath,
  language
}) {
  return simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language
    },
  });
}