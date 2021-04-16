<template>
  <NuxtLink :to="path" class="micro-format-product">
    <!--
      article tag added only for semantic purposes.
      If you want to remove it, add its styles to the
      `.micro-format-product` selector
    -->
    <article class="micro-format-product__inner">
      <div class="micro-format-product__info">
        <h3 class="micro-format-product__title">{{ name }}</h3>
        <MicroFormatProductPrice :variant="variant" />
      </div>

      <div v-if="image" class="micro-format-product__media">
        <CrystallizeImage
          :image="image"
          :width="1024"
          class="micro-format-product__image"
        />
      </div>
    </article>
  </NuxtLink>
</template>

<script>
import { findDefaultVariant } from "./utils";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    const d = this.data;
    const c = d.components || [];
    const defaultVariant =
      this.data.defaultVariant || findDefaultVariant(d.variants) || {};

    return {
      description: c.find((c) => c.type === "richText")?.content?.json,
      image: defaultVariant.images?.[0],
      name: d.name,
      path: d.path,
      type: d.type,
      variant: defaultVariant,
    };
  },
};
</script>

<style scoped src='./index.css'></style>