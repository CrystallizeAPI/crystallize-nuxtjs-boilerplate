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

<style scoped>
a {
  text-decoration: none;
}

.outer {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  /* padding: 20px; */
  transition: all 0.1s ease-in-out;
  grid-column-end: span 3;
}

.inner {
  height: 100%;
  background: var(--color-box-background);
  display: flex;
  min-height: 450px;
  justify-content: center;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.image-wrapper >>> img {
  display: block;
  /* If you want to contain your images, change object-fit to `contain` */
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  color: var(--color-text-main);
}

.text h2 {
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
  font-family: "Roboto", sans-serif;
  margin: 0;
}

.price {
  color: var(--color-price);
  font-weight: bold;
  font-size: 1rem;
  padding-top: 5px;
}

@media (max-width: 768px) {
  .outer {
    margin-bottom: 15px;
  }
}
</style>
