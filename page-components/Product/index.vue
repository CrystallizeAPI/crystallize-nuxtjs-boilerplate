<template>
  <FetchLoader :state="$fetchState">
    <Outer>
      <div class="top section">
        <div class="main-info">
          <h1 class="name">{{ product.name }}</h1>
          <div class="summary">
            <CrystallizeItemComponents :components="summary" />
          </div>
          <VariantSelector
            :selected-variant="selectedVariant"
            :variants="product.variants"
            @on-change="onSelectedVariantChange"
          />

          <div v-if="selectedVariant" class="price-wrap">
            <Price :variant="selectedVariant" />
          </div>
        </div>
        <div class="media">
          <CrystallizeImage :image="image" />
        </div>
      </div>
      <div class="product-secondary-info">
        <div class="section">
          <CrystallizeItemComponents :components="components" />
        </div>
        <div class="section properties">
          <CrystallizeItemComponents :components="specs" />
        </div>
      </div>
    </Outer>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";

import { simplyFetchFromGraph } from "../../lib/graph";
import fragments from "../../lib/graph/fragments";

import VariantSelector from "./variant-selector";

export default {
  components: {
    VariantSelector,
  },
  data() {
    return {
      product: {},
      components: [],
      image: null,
      description: null,
      summary: null,
      selectedVariant: null,
      specs: null,
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

    // Get the summary
    this.summary = product?.components?.filter((c) => c.id === "summary");

    // Get the specs
    this.specs = product?.components?.filter((c) => c.id === "specs");

    // Get the rest of components to show
    this.components = product?.components?.filter(
      (c) => !["specs", "summary"].includes(c.id)
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
  methods: {
    onSelectedVariantChange(variant) {
      this.selectedVariant = variant;
    },
  },
};
</script>

<style scoped>
.section {
  background: var(--color-box-background);
  padding: 25px;
}

@media (min-width: 1024px) {
  .section {
    padding: 50px;
  }
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: center;
  margin-bottom: 15px;
}

@media (min-width: 1024px) {
  .top {
    flex-direction: row-reverse;
  }
}

.main-info {
}

@media (min-width: 1024px) {
  .main-info {
    flex: 0 0 30%;
    margin: 0 50px;
  }
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
  position: relative;
}

@media (min-width: 1024px) {
  .media {
    padding: 3rem;
  }
}

.media >>> img {
  object-fit: contain;
  max-height: 50vh;
  width: 100%;
  height: 100%;
}

@media (min-width: 1024px) {
  .media >>> img {
    max-height: 80vh;
  }
}

.product-secondary-info {
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
}

@media (min-width: 1024px) {
  .product-secondary-info {
    display: grid;
    grid-template-columns: auto 500px;
    grid-gap: 15px;
  }
}

.price-wrap {
  padding-top: 45px;
  border-top: 1px solid rgb(206, 206, 206);
  color: var(--color-text-sub);
  font-size: 30px;
  margin: 20px 20px 20px 0px;
}
</style>
