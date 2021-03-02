import fragments from "../../lib/graph/fragments";

export const QUERY_DOCUMENT = `
  query DOCUMENT_PAGE($path: String!, $language: String!) {
    document: catalogue (path: $path, language: $language) {
      ...item
      ...product
    }
  }

  ${fragments}
`