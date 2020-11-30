<template>
  <NuxtLink :to="path" class="outer">
    <div class="inner">
      <div class="image-wrapper">
        <CrystallizeImage :image="image" :alt="name" sizes="50vw" />
      </div>
      <div class="text">
        <span class="price">
          <Price :variant="variant" />
        </span>
        <H3>{{ name }}</H3>
      </div>
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
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 20px;
  background: var(--color-box-background);
  transition: all 0.1s ease-in-out;
  grid-column-end: span 3;
}

.inner {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 250px;
}

.image-wrapper >>> img {
  display: block;
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  z-index: 2;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  left: 0;
  width: 100%;
  padding: 1em;
  color: var(--color-text-main);
}

.text h3 {
  font-size: 1.5rem;
  text-transform: uppercase;
  color: inherit;
  font-family: "Roboto", sans-serif;
  margin: 0;
}

.price {
  color: var(--color-price);
  font-weight: bold;
  padding-bottom: 5px;
}

@media (max-width: 768px) {
  .outer {
    margin-bottom: 15px;
  }
}
</style>
