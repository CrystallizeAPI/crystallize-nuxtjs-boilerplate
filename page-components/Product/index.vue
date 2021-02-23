<template>
  <FetchLoader :state="$fetchState">
    <Outer>
      <div class="top section">
        <div class="main-info">
          <h1 class="name">{{ product.name }}</h1>
          <div class="summary">
            <CrystallizeComponents :components="summary" />
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
          <CrystallizeComponents :components="components" />
        </div>
        <div class="section properties">
          <CrystallizeComponents :components="specs" />
        </div>
      </div>
    </Outer>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import {getProductData} from './get-product-data'
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
     * As default, we get EVERYTHING for this product.
     * To change the behavior, you can modify:
     * 1- Modify the ./query.js file
     * 2- Pass a new query as parameter
     */
    const response = await getProductData({
      asPath: route.path,
      language: locale.crystallizeCatalogueLanguage,
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

<style scoped src='./index.css'></style>
