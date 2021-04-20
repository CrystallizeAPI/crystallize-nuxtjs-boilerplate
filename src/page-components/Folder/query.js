import fragments from "/lib/graph/fragments";

export const QUERY_FOLDER = `
  query FOLDER_PAGE($path: String!, $language: String!) {
    folder: catalogue (path: $path, language: $language) {
      ...item
      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`