import fetch from "isomorphic-unfetch";

export function safePathQuery({ variables, ...rest }) {
  if (variables && "path" in variables) {
    const safePath = (variables.path || "")
      .split("?")[0]
      .split("#")[0]
      .replace(/\/$/, "");

    return {
      variables: {
        ...variables,
        path: safePath,
      },
      ...rest,
    };
  }

  return {
    variables,
    ...rest,
  };
}

export async function simplyFetchFromGraph({
  uri = `https://api.crystallize.com/${process.env.CRYSTALLIZE_TENANT_IDENTIFIER}/catalogue`,
  query,
  variables,
}) {
  const body = JSON.stringify(safePathQuery({ query, variables }));

  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export function simplyFetchFromSearchGraph(args) {
  return simplyFetchFromGraph({
    uri: `https://api.crystallize.com/${process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER}/search`,
    ...args
  });
}

export async function getAllCatalogueItems(language) {
  const response = await simplyFetchFromGraph({
    query: `
      query GET_ALL_CATALOGUE_ITEMS($language: String!) {
        catalogue(language: $language, path: "/") {
          path
          name
          type
          children {
            path
            name
            type
            children {
              path
              name
              type
              children {
                path
                name
                type
                children {
                  path
                  name
                  type
                  children {
                    path
                    name
                    type
                    children {
                      path
                      name
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      language,
    },
  });

  return response.data.catalogue.children;
}
