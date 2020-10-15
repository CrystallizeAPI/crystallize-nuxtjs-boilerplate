<template>
  <div>
    <div v-if="!data"></div>
    <NuxtLink :to="path" v-else>
      <div class="outer">
        <div class="image-wrapper">
           <img 
            :src="image"
            :alt="name"
          >
        </div>
      </div>
      <div class="text">
        <H3>{{ name }}</H3>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['data', 'gridCell'],
  data() {
    return {
      name: this.data,
      path: this.path,
      imageMdWidth: 100 / (gridCell?.layout?.colspan ?? 1),
      image: '',
    }
  },
  mounted() {
    const images = this.data.components.find((c) => c.type === 'images')
    this.image = images?.content?.images?.[0];
  }
}
</script>

<style scoped>
.outer {
  display: block;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 1em;
  background: var(--color-box-background);
  grid-column-end: span 4;
}

.image-wrapper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
}

.img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img img {
  display: block;
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.text {
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;
}

.text h3 {
  position: absolute;
  bottom: 4rem;
  width: 100%;
  left: 0%;
  font-size: 1.4em;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  color: black;
}

.price {
  color: inherit;
  font-weight: bold;
}

</style>