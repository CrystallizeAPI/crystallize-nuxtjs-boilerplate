// @todo: why the process.env.NEXT_PUBLIC_SERVICE_API_URL is undefined?
// const URI = process.env.NEXT_PUBLIC_SERVICE_API_URL
const HARCODED_URI = "http://localhost:3001/api/graphql"

export async function serviceApi({
  uri = HARCODED_URI,
  query,
  variables
}) {
  const body = JSON.stringify({ query, variables });

  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Service API encountered an error', json.errors);
  }

  return json;
}
