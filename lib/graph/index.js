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

/**
 * If you have enabled authentication on your APIs, then you need to
 * proxy the requests through the Service API:
 * const crystallizeApiUrlBase = process.env.SERVICE_API_URL.replace(
 *  '/graphql',
 *  '/crystallize'
 * );
 * Read more about authentication for the APIs here:
 * https://crystallize.com/learn/developer-guides/api-overview/authentication
 */
const crystallizeApiUrlBase = `https://api.crystallize.com/${process.env.CRYSTALLIZE_TENANT_IDENTIFIER}`;

export async function simplyFetchFromGraph({
  uri = `${crystallizeApiUrlBase}/catalogue`,
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
    uri: `${crystallizeApiUrlBase}/search`,
    ...args,
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
