import { simplyFetchFromGraph } from "../../lib/graph";
import { QUERY_DOCUMENT } from "./query";

export async function getDocumentData({
  query = QUERY_DOCUMENT,
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