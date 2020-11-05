import { simplyFetchFromGraph } from "./lib/graph";

export default {
  env: {
    // Expose CRYSTALLIZE_TENANT_IDENTIFIER to the client side script
    CRYSTALLIZE_TENANT_IDENTIFIER: process.env.CRYSTALLIZE_TENANT_IDENTIFIER,
  },
  components: true,
  server: {
    port: 8000, // default: 3000
  },
  router: {
    async extendRoutes(routes, resolve) {
      function handleItem({ path, name = "", children }) {
        if (path !== "/index" && !name.startsWith("_")) {
          // if (defaultLocale !== locale.locale) {
          //   paths.push(`/${locale.locale}${path}`);
          // } else {
          //   paths.push(path);
          // }

          routes.push({
            name: path,
            path,
            component: resolve(__dirname, "pages/hey.vue"),
          });
        }

        if (children) {
          children.forEach(handleItem);
        }
      }

      const allCatalogueItems = await simplyFetchFromGraph({
        query: `
        query GET_ALL_CATALOGUE_ITEMS($language: String!) {
          catalogue(language: $language, path: "/") {
            path
            name
            children {
              path
              name
              children {
                path
                name
                children {
                  path
                  name
                  children {
                    path
                    name
                    children {
                      path
                      name
                      children {
                        path
                        name
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
          language: "en",
        },
      });

      allCatalogueItems.data.catalogue.children.forEach(handleItem);
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
  modules: ["@nuxt/http"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
