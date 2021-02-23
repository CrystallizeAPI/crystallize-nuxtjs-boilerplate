import { getAllCatalogueItems } from "./lib/graph";

function getComponentPathForRoute({ type }) {
  switch (type) {
    case "product": {
      return "page-components/Product/index.vue";
    }
    case "document": {
      return "page-components/Document/index.vue";
    }
    default: {
      return "page-components/Folder/index.vue";
    }
  }
}

import appConfig from "./app.config.json";

const locale = appConfig.locale || {
  locale: "en",
  displayName: "English - US",
  appLanguage: "en-US",
  crystallizeCatalogueLanguage: "en",
  crystallizePriceVariant: "default",
};

export default {
  env: {
    // Expose CRYSTALLIZE_TENANT_IDENTIFIER to the client side script
    CRYSTALLIZE_TENANT_IDENTIFIER: process.env.CRYSTALLIZE_TENANT_IDENTIFIER,
  },
  components: true, // NuxtJS will import automatically yor components
  server: {
    port: 8000 // default: 3000
  },
  router: {
    async extendRoutes(routes, resolve) {
      /*
       * We extend the router to dynamically indicate at build time
       * what /page-component we want to be rendered for each route.
       * 
       * We query all items from the catalogue, and iterate them.
       * For each result, we get it's /page-component depending on the type.
       */
      function handleItem({ path, name = "", type, children }) {
        const isHomePage = path === "/index"
        // Assets aer used to create content such as banners and grids
        const isCrystallizeAssets = name.startsWith("_")

        /*
         * The home page has its explicit render.
         * Assets cannot be rendered as a page.
         * Because of this, we omit these cases.
         */
        if (!isHomePage && !isCrystallizeAssets) {
          routes.push({
            name: path,
            path,
            component: resolve(__dirname, getComponentPathForRoute({ type })),
          });
        }
        if (children) {
          children.forEach(handleItem);
        }
      }

      const allCatalogueItems = await getAllCatalogueItems(
        locale.crystallizeCatalogueLanguage
      );

      allCatalogueItems.forEach(handleItem);
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "mask-icon", href: "/mask-icon.svg", color: "#5bbad5" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/styles/global.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-i18n"],

  i18n: {
    seo: true,
    lazy: true,
    langDir: "lang/",
    defaultLocale: locale.locale,
    locales: [
      {
        code: locale.locale,
        iso: locale.appLanguage,
        file: `${locale.appLanguage}.js`,
        ...locale,
      },
    ],
    vueI18n: {
      fallbackLocale: locale.locale,
    },
    numberFormats: {
      "en-US": {
        currency: {
          style: "currency",
          currency: "USD",
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {},
  },
};
