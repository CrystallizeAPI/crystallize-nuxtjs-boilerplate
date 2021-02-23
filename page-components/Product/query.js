import fragments from "../../lib/graph/fragments";

export const QUERY_PRODUCT = `
  query PRODUCT_PAGE($path: String!, $language: String!) {
    product: catalogue (path: $path, language: $language) {
      ...item
      ...product
    }
  }

  ${fragments}
`