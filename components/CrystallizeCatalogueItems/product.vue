<template>
  <NuxtLink :to="path" class="outer">
    <div class="inner">
      <div class="image-wrapper">
        <CrystallizeImage :image="image" :alt="name" sizes="50vw" />
      </div>
    </div>
    <div class="text">
      <h2>{{ name }}</h2>
      <span class="price">
        <Price :variant="variant" />
      </span>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    const { name, path, variants, defaultVariant } = this.data;

    const variant = defaultVariant || variants.find((v) => v.isDefault);

    return {
      name,
      path,
      image: variant.images?.[0],
      variant,
    };
  },
};
</script>

<style scoped src='./product.css'></style>
