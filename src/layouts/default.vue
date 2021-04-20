<template>
  <div>
    <p v-if="$fetchState.pending">Hold on...</p>
    <p v-else-if="$fetchState.error">
      Oh no! There was an error fetching the data in layouts/default.vue
    </p>
    <div v-else>
      <AuthenticationProvider>
        <BasketProvider>
          <LayoutWithAsideView>
            <template v-slot:view-to-toggle>
              <TinyBasket v-slot:view-to-toggle />
            </template>
            <template>
              <PreviewBar v-if="isPreviewMode" />
              <LayoutHeader>
                <template v-slot:navigation>
                  <LayoutNavigation :nav-items="navItems" />
                </template>
                <template v-slot:actions>
                  <div class="layout__actions">
                    <IconButton
                      :to="linkUserArea"
                      screenReaderText="User area"
                      iconSrc="/icons/user.svg"
                    />
                    <Search />
                    <BasketButton />
                  </div>
                </template>
              </LayoutHeader>
              <nuxt />
              <LayoutFooter :nav-items="navItems" />
            </template>
          </LayoutWithAsideView>
        </BasketProvider>
      </AuthenticationProvider>
    </div>
  </div>
</template>

<script>
import AuthenticationProvider from "../providers/Authentication";
import BasketProvider from "../providers/Basket";
import { simplyFetchFromGraph } from "/lib/graph";
import TinyBasket from "../components/Basket/TinyBasket";

export default {
  components: { AuthenticationProvider, BasketProvider, TinyBasket },
  data() {
    return {
      isPreviewMode: this.$route.query.preview,
      navItems: [],
    };
  },
  computed: {
    linkUserArea() {
      const { isLoggedIn } = this.$store.state.authentication;
      /*
       * We provide the most relevant URL to have the best user experience
       * that depends on the user authentication.
       *
       * For identified users, the URL provided is "/account"
       * For anonymous users, the URL provided is "/login"
       */
      return isLoggedIn ? "/account" : "/login";
    },
  },
  head() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    return {
      link: [
        {
          rel: "canonical",
          href: `${process.env.SITE_URL}${this.$route.path}`,
        },
        this.retrieveAttributesHreflang(locale.appLanguage),
      ],
    };
  },
  methods: {
    retrieveAttributesHreflang(languageCountryLocale) {
      // hreflang has the format language-country (en-US, en-UK).
      return {
        rel: "alternate",
        hreflang: languageCountryLocale,
        href: `${process.env.SITE_URL}${this.$route.path}`,
      };
    },
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Getting the top level catalogue items
     * to show in the header and footer
     */
    const { data } = await simplyFetchFromGraph({
      query: `
        query GET_NAV_ITEMS($language: String!) {
          catalogue(language: $language) {
            children {
              id
              name
              path
            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    /**
     * Filter the items you don't want in the nav bar
     */
    this.navItems = data.catalogue.children.filter(
      (c) => !c.name.startsWith("_")
    );
  },
};
</script>

<style scoped>
.layout__actions {
  display: flex;
}

@media screen and (min-width: 768px) {
  .layout__actions > * {
    margin-left: 0.35rem;
  }
}
</style>