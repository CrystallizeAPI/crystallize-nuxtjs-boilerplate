<template>
  <FetchLoader :state="$fetchState">
    <main class="product-page">
      <div class="product-page__inner">
        <!-- @todo: try to use the PageHeader component, had issues with the description -->
        <header class="product-page__header">
          <div class="product-page__header-inner">
            <h1 class="product-page__title">{{ product.name }}</h1>

            <div class="product-page__summary">
              <CrystallizeComponents :components="summary" />
            </div>
            <TopicsList v-if="topics" :data="topics" :isUnderlined="false" />
            <!-- @todo: add images to the variant buttons -->
            <VariantSelector
              :selected-variant="selectedVariant"
              :variants="product.variants"
              @on-change="onSelectedVariantChange"
            />
            <div class="product-page__pricing-details">
              <Price :variant="selectedVariant" />
              <BuyButton />
            </div>
            <Stock v-if="selectedVariant" :stock="selectedVariant.stock" />
          </div>
        </header>

        <!--
          The article component does overwrite styles in order to
          make the document/article look the same after using
          CrystallizeComponents
          -->
        <div class="product-page__organic-content">
          <div v-if="images" class="product-page__pre-article-images">
            <CrystallizeComponentsImages :data="images" />
          </div>
          <Article>
            <div class="product-page__specs">
              <CrystallizeComponents :components="specs" />
            </div>
            <CrystallizeComponents :components="components" />
          </Article>
        </div>
      </div>

      <aside>asdasdas</aside>
    </main>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getProductData } from "./get-product-data";
import VariantSelector from "./VariantSelector/index";
import Price from "./price/index";
import BuyButton from "./buy/index";
import Stock from "./stock/index";
import {
  isSumaryComponent,
  isDescriptionComponent,
  isSpecsComponent,
  COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS,
} from "./utils";

export default {
  components: {
    VariantSelector,
    Price,
    BuyButton,
    Stock,
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
        (c) => !COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS.includes(c.name)
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
      this.images = variant.images;
    },
  },
};
</script>

<style scoped src='./index.css'></style>
