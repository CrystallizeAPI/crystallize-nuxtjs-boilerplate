import fragments from '/lib/graph/fragments';

export const SEARCH_PAGE_QUERY = `
  query SEARCH_PAGE($language: String!, $path: String, $version: VersionLabel!) {
    searchPage: catalogue(language: $language, path: $path, version: $version) {
      ...item

      children {
        ...item
        ...product
      }
    }
  }

  ${fragments}
`;