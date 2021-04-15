<template>
  <FetchLoader :state="$fetchState">
    <Container>
      <main class="product-page">
        <div class="product-page__inner">
          <div class="product-page__header">
            <PageHeader
              class="product-page__header-inner"
              :title="product.name"
            >
              <template v-slot:postHeader>
                <div class="product-page__summary">
                  <CrystallizeComponents :components="summary" />
                </div>
                <TopicsList
                  v-if="topics"
                  :data="topics"
                  :isUnderlined="false"
                />
                <VariantSelector
                  :selected-variant="selectedVariant"
                  :variants="product.variants"
                  @on-change="onSelectedVariantChange"
                />
                <div class="product-page__pricing-details">
                  <Price
                    v-if="selectedVariant.priceVariants"
                    :variant="selectedVariant"
                  />
                  <BuyButton
                    :isLoading="isItemBeingAddedToCart"
                    @click="handleBuyItem"
                  />
                </div>
                <Stock v-if="selectedVariant" :stock="selectedVariant.stock" />
              </template>
            </PageHeader>
          </div>

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

        <aside class="product-page__related-content">
          <Collection
            v-if="relatedProducts"
            title="You might also be interested in"
          >
            <CrystallizeCatalogueSlider :items="relatedProducts" />
          </Collection>
        </aside>
      </main>
    </Container>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getProductData } from "./get-data";
import VariantSelector from "./VariantSelector/index";
import Price from "./price/index";
import BuyButton from "./buy/index";
import Stock from "./stock/index";
import {
  isSumaryComponent,
  isDescriptionComponent,
  isSpecsComponent,
  isRelatedProductsComponent,
  COMPONENT_NAMES_TO_EXTRACT_FROM_COMPONENTS,
} from "./utils";
import { lockScroll } from "/lib/layout";

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
      relatedProducts: null,
      isItemBeingAddedToCart: false,
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
      preview: this.$route.query.preview,
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
      this.relatedProducts = components.find(
        isRelatedProductsComponent
      )?.content?.items;
    }
  },
  /**
   * If the path of the product starts with /vouchers it means that is a product
   * that acts as a voucher. They cannot be added to the cart, and the resulting
   * render it's almost an empty page. Because of this, we redirect the user
   * to the home page.
   */
  middleware({ redirect, route }) {
    if (route.path.startsWith("/vouchers")) {
      redirect("/");
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
    handleBuyItem() {
      /*
       * We indicate that the item is being added to the cart
       * so we can show a spinner and increase the user experience
       */
      this.isItemBeingAddedToCart = true;
      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { getRelativePriceVariants } = require("/lib/pricing");
      const variantPricing = getRelativePriceVariants({
        variant: this.selectedVariant,
        locale,
      });
      const variantDiscountPrice = variantPricing?.discountPrice;
      const variantDefaultPrice = variantPricing?.defaultPrice;

      this.$store
        .dispatch("basket/addItem", {
          sku: this.selectedVariant.sku,
          path: this.product.path,
          priceVariantIdentifier: variantDiscountPrice
            ? variantDiscountPrice.identifier
            : variantDefaultPrice.identifier || locale.crystallizePriceVariant,
        })
        .then(() => {
          lockScroll();

          const TIME_TO_SHOW_SPINNER = 250;
          const TIME_TO_ADD_ITEM_TO_CART = 250;
          /**
           * We add a delay so the spinner can be visualize for a small period of time.
           */
          setTimeout(() => {
            this.isItemBeingAddedToCart = false;
            setTimeout(() => {
              this.$store.dispatch("basket/drawAttentionToItem", {
                sku: this.selectedVariant.sku,
              });
            }, TIME_TO_ADD_ITEM_TO_CART);
          }, TIME_TO_SHOW_SPINNER);
        })
        .catch(() => {
          /**
           * If it failed, we make the spinner disappear too.
           */
          this.isItemBeingAddedToCart = false;
        });
    },
  },
};
</script>

<style scoped src='./index.css'></style>
