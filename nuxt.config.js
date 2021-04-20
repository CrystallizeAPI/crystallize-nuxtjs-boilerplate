import { getAllCatalogueItems } from "./lib/graph";

const RENDERS = {
  product: {
    path: 'src/page-components/Product/index.vue'
  },
  folder: {
    path: 'src/page-components/Folder/index.vue'
  },
  document: {
    path: 'src/page-components/Document/index.vue'
  },
  search: {
    path: 'src/page-components/Search/index.vue'
  },
}

function getComponentPathForRoute({ type, children }) {
  if (children && childrenIsMostlyProducts(children)) {
    return RENDERS.search.path;
  }

  switch (type) {
    case "product": {
      return RENDERS.product.path;
    }
    case "document": {
      return RENDERS.document.path;
    }
    default: {
      return RENDERS.folder.path;
    }
  }
}

function childrenIsMostlyProducts(children) {
  const productsCount = children?.filter((c) => c.type === 'product').length;
  return productsCount > children.length / 2;
}

import appConfig from "./app.config.json";

const defaultLocale = appConfig.locale || {
  locale: "en",
  displayName: "English - US",
  appLanguage: "en-US",
  crystallizeCatalogueLanguage: "en",
  crystallizePriceVariant: "default",
};

export default {
  /**
   * target: "server" is default configuration for NuxtJS.
   * Whoever, we want to point out that we can edit this.
   * 
   * We've included the NuxtJS preview mode functionality in this boilerplate
   * that is ONLY available if you use "target: 'static'".
   * You'll see a bar on the top that indicates that you're in the preview mode.
   * For your information: https://nuxtjs.org/docs/2.x/features/live-preview#passing-data-to-enablepreview.
   * 
   * Also, no matter the target configuration you're using, if you add '?preview=true'
   * to any page, you'll fetch a draft version from Crystallize of that resource,
   * and the peview bar will be shown as well.
   */
  target: 'server',
  env: {
    /**
     * IMPORTANT: In order to work with env variables, you must map them explicitly
     * or NuxtJS will not expose them to your code, and in consequence, they will be undefined.
     * 
     * For more information: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env/
     */
    CRYSTALLIZE_TENANT_IDENTIFIER: process.env.CRYSTALLIZE_TENANT_IDENTIFIER,
    SERVICE_API_URL: process.env.SERVICE_API_URL,
    // Used to generate the hreflang attributes for SEO purposes
    SITE_URL: process.env.SITE_URL
  },
  srcDir: "src/",
  components: true, // NuxtJS will import automatically yor components
  server: {
    port: process.env.PORT // default port is 3000
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
            component: resolve(__dirname, getComponentPathForRoute({ type, children })),
          });
        }
        if (children) {
          children.forEach(handleItem);
        }
      }

      const allCatalogueItems = await getAllCatalogueItems(
        defaultLocale.crystallizeCatalogueLanguage
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
  plugins: [
    { src: '~/plugins/preview.client.js', mode: "client" }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-i18n"],

  i18n: {
    seo: true,
    lazy: true,
    langDir: "locales/",
    defaultLocale: defaultLocale.locale,
    locales: [
      {
        code: defaultLocale.locale,
        iso: defaultLocale.appLanguage,
        file: `${defaultLocale.locale}.js`,
        ...defaultLocale,
      },
    ],
    vueI18n: {
      fallbackLocale: defaultLocale.locale,
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
