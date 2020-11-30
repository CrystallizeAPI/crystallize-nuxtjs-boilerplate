<template>
  <FetchLoader :state="$fetchState">
    <Outer>
      <div class="top section">
        <div class="media">
          <CrystallizeImage :image="image" />
        </div>
        <div class="short-info">
          <H1 class="name">{{ product.name }}</H1>
          <div class="summary">
            <CrystallizeContentTransformer :data="summary" />
          </div>
        </div>
      </div>
      <div class="product-secondary-info">
        <div class="section">
          <CrystallizeItemComponents :components="components" />
        </div>
        <div class="section properties">props</div>
      </div>
    </Outer>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { simplyFetchFromGraph } from "../lib/graph";
import fragments from "../lib/graph/fragments";

export default {
  data() {
    return {
      product: {},
      components: [],
      image: null,
      description: null,
      summary: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Get EVERYTHING for this product
     * You probably want to cherry pick the fields in
     * the query here to improve performance
     */
    const response = await simplyFetchFromGraph({
      query: `
        query PRODUCT_PAGE($path: String!, $language: String!) {
          product: catalogue (path: $path, language: $language) {
            ...item
            ...product
          }
        }

        ${fragments}
      `,
      variables: {
        path: route.path,
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    const { product } = response.data;

    // Get a description for the product
    const richTextComponent = product?.components?.find(
      (c) => c.type === "richText"
    );
    if (richTextComponent?.content?.json) {
      // Provide a good meta description for this page
      this.metaDescription = toText(richTextComponent.content.json);
    }
    this.description = product?.components?.find((c) => c.id === "description");

    // Get a summary
    this.summary = product?.components?.find(
      (c) => c.id === "summary"
    )?.content?.json;

    /**
     * Extract a selection of components to show
     */
    this.components = product?.components?.filter(
      (c) => !["description", "summary"].includes(c.id)
    );

    this.product = product;

    this.selectedVariant = product.variants.find((v) => v.isDefault);

    this.image = this.selectedVariant.images?.[0];
  },
  head() {
    if (!this.metaDescription && this.product?.name) {
      console.warn(
        "this.metaDescription is missing for product",
        this.product.name
      );
    }

    return {
      title: this.product?.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription,
        },
      ],
    };
  },
};
</script>

<style scoped>
.section {
  background: var(--color-box-background);
  padding: 50px;
}

.top {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: center;
  margin-bottom: 15px;
}

.short-info {
  flex: 0 0 30%;
  margin: 0 50px;
}

h1.name {
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
}

.summary {
  margin: 0px 0px 0.5em;
  line-height: 1.8;
}

.media {
  flex: 1 1 auto;
  padding: 3rem;
  position: relative;
}

.media >>> img {
  object-fit: contain;
  max-height: 80vh;
  width: 100%;
  height: 100%;
}

.product-secondary-info {
  display: grid;
  grid-template-columns: auto 500px;
  grid-gap: 15px;
}
</style>
