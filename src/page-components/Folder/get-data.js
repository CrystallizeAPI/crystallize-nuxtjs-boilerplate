import { QUERY_FOLDER } from './query'
import { simplyFetchFromGraph } from "/lib/graph";

export async function getData({
  query = QUERY_FOLDER,
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