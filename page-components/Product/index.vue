<template>
  <FetchLoader :state="$fetchState">
    <main class="product-page">
      <header class="product-page__header">
        <h1 class="product-page__title">{{ product.name }}</h1>
        <div class="product-page__summary">
          <CrystallizeComponents :components="summary" />
        </div>
        <TopicsList v-if="topics" :data="topics" :isUnderlined="false" />
        <VariantSelector
          :selected-variant="selectedVariant"
          :variants="product.variants"
          @on-change="onSelectedVariantChange"
        />
        <!-- <div v-if="selectedVariant" class="price-wrap">
          <Price :variant="selectedVariant" />
        </div> -->
      </header>

      <div>
        <!-- <section
          v-if="selectedVariant"
          class="product-page__pre-article-images"
          :aria-label="`Gallery of ${product.name}`"
        >
          <CrystallizeImage
            :v-for="image in images"
            :image="image"
            :width="768"
          />
        </section> -->
        <!--
          The article component does overwrite styles in order to
          make the document/article look the same after using
          CrystallizeComponents
          -->
        <Article>
          <CrystallizeComponents :components="[components]" />
        </Article>
      </div>

      <div class="product-secondary-info">
        <div class="section">
          <CrystallizeComponents :components="components" />
        </div>
        <div class="section properties">
          <CrystallizeComponents :components="specs" />
        </div>
      </div>
    </main>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getProductData } from "./get-product-data";
import VariantSelector from "./variant-selector";
import {
  isSumaryComponent,
  isDescriptionComponent,
  isSpecsComponent,
  COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS,
} from "./utils";

export default {
  components: {
    VariantSelector,
  },
  data() {
    return {
      product: {},
      components: [],
      images: null,
      summary: null,
      topics: null,
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
    const { data } = await getProductData({
      asPath: route.path,
      language: locale.crystallizeCatalogueLanguage,
    });

    const { product } = data;
    if (!product) {
      return;
    }

    this.product = product;
    const { components = [], variants = [], topics } = product;

    if (components && components.length) {
      const descriptionComponent = components.find(isDescriptionComponent);
      if (descriptionComponent?.content?.json) {
        this.metaDescription = toText(descriptionComponent.content.json);
      }

      this.summary = components.filter(isSumaryComponent);
      this.topics = topics;
      this.specs = components.filter(isSpecsComponent);

      /*
       * Since we will render all the components on the body,
       * We want to extract the ones we're rendering explicitly
       * so we don't have duplicated content
       */
      this.components = components.filter(
        (c) => !COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS.includes(c.id)
      );
      this.selectedVariant = variants.find((v) => v.isDefault);
      this.images = this.selectedVariant.images;
    }
  },
  head() {
    if (!this.metaDescription && this.product.name) {
      console.warn(
        "this.metaDescription is missing for product",
        this.product.name
      );
    }

    return {
      title: this.product.name,
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
