<template>
  <div v-if="!data"></div>
  <NuxtLink v-else to="" >
    <div class="outer">
      <div class="inner">
        <div class="image-wrapper">
          <div v-if="image">
            <!-- <ImageComponent :image="image" :alt="name" sizes="250px" /> -->
          </div>
        </div>
        <div class="text">
          <span class="price"></span>
          <!-- <H3></H3> -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      name: this.data.name,
      path: this.data.path,
      type: this.data.type,
      price: '',
      image: this.data.variants ? this.findVariant(this.data.variants) : {}
    }
  },
  mounted() {
    console.log('DATA FROM PRODUCT ITEM', this.data);
  },
  methods: {
    findVariant(variants) {
      return variants.find((variant) => variant.isDefault)
    }
  }
}
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
  padding: 20px;
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

.img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img > img {
  display: block;
  object-fit: cover;
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
  font-family: 'Roboto', sans-serif;
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