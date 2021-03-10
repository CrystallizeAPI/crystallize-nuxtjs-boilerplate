import { QUERY_FOLDER } from './query'
import { simplyFetchFromGraph } from "../../lib/graph";

export async function getData({
  query = QUERY_FOLDER,
  asPath,
  language
}) {
  return simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
    },
  });
}