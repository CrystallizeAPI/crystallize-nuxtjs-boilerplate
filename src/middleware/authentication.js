import { serviceApi } from '/lib/service-api'

/**
 * Specify where the user should land after logging out
 * ?redirect=http://example.com.
 * In this case, we decide that a good place is the home page.
 */
const PATH_HOME_PAGE = "/"
const REDIRECT_TO_PATH = PATH_HOME_PAGE;

export default async function ({ store }) {
  const user = await getCurrentUser();
  const logoutLinkWithRedirect = new URL(user.logoutLink);
  logoutLinkWithRedirect.searchParams.append(
    "redirect",
    encodeURIComponent(
      `${location.protocol}//${location.host}${REDIRECT_TO_PATH}`
    )
  );
}

export async function getCurrentUser() {
  const response = await serviceApi({
    query: `
      {
        user {
          isLoggedIn
          logoutLink
          email
        }
      }
    `
  });

  const { user } = response.data;
  return user
}