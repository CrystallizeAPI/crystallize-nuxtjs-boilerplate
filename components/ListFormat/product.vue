<template>
  <article class="list-format-product">
    <div class="list-format-product__info">
      <h3 class="list-format-product__title">{{ name }}</h3>
      <GridItemPrice :variant="variant" />
    </div>

    <div class="list-format-product__media">
      <CrystallizeVideo v-if="video" :video="video" />
      <CrystallizeImage
        v-else
        :image="image"
        :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
        :width="1024"
        class="list-format-product__image"
      />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
    video: {
      type: Object,
      required: false,
    },
    image: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped src='./product.css'></style>