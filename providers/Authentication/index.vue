<template>
  <div class="authentication-provider">
    <slot />
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";

/**
 * Specify where the user should land after logging out
 * ?redirect=http://example.com
 */
function generateURLWithRedirect({ url, redirectToPath }) {
  const _url = new URL(url);
  const uri = `${location.protocol}//${location.host}`;
  _url.searchParams.append(
    "redirect",
    encodeURIComponent(`${uri}${redirectToPath}`)
  );

  return _url;
}

async function retrieveCurrentAuthenticationStatus() {
  const response = await serviceApi({
    query: `
        {
          user {
            isLoggedIn
            logoutLink
            email
          }
        }
      `,
  });

  const {
    user: { email, isLoggedIn, logoutLink },
  } = response.data;

  const urlWithRedirect = generateURLWithRedirect({
    url: logoutLink,
    redirectToPath: "/",
  });

  const user = isLoggedIn ? { email } : null;
  return { user, logoutLink: urlWithRedirect };
}

export default {
  async mounted() {
    /**
     * Authentication logic when the application is loaded for first time
     */
    const { user, logoutLink } = await retrieveCurrentAuthenticationStatus();
    if (user) {
      this.$store.dispatch("authentication/login", { user, logoutLink });
    }
  },
};
</script>
