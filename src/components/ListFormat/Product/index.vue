<template>
  <NuxtLink :to="path" class="list-format-product">
    <!--
      article tag added only for semantic purposes.
      If you want to remove it, add its styles to the
      `.list-format-product` selector
    -->
    <article class="list-format-product__inner">
      <div class="list-format-product__info">
        <h3 class="list-format-product__title">{{ name }}</h3>
        <ListFormatProductPrice :variant="variant" />
      </div>

      <!-- We assume that there will always be an image or a video -->
      <div v-if="image || video" class="list-format-product__media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :width="1024"
          class="list-format-product__image"
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
      this.data.defaultVariant ||
      this.data.matchingVariant ||
      findDefaultVariant(d.variants) ||
      {};

    return {
      description: c.find((c) => c.type === "richText")?.content?.json,
      image: defaultVariant.images?.[0],
      name: d.name,
      path: d.path,
      type: d.type,
      variant: defaultVariant,
      video: c.find((c) => c.type === "videos")?.content?.videos?.[0],
    };
  },
};
</script>

<style scoped src='./index.css'></style>