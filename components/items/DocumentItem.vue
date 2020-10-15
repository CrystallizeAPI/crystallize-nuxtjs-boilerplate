<template>
  <div>
    <div v-if="!data"></div>
    <!-- <NuxtLink v-if="image">
      <div>

      </div>
    </NuxtLink> -->
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    colSpan: {
      type: String,
      default: '4'
    }
  },
  mounted() {
    const { name, path } = this.data;

    let image;
    const images = this.data.components?.find((c) => c.type === 'images');
    image = images?.content?.images?.[0];
    const description = this.data.components?.find((c) => c.name === 'Intro');
    const video = this.data.components?.find((c) => c.name === 'Video');

    // add video logic
  }
}
</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  height: 100%;

   /* ${(p) => (p.span ? `grid-column-end: span ${p.span}` : null)}; */
}

.media-wrapper {
  flex: 0 0 auto;
}

.media-inner {
  flex: 1 1 100%;
}

.image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image img {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  flex: 1 1 auto;
  color: var(--color-text-main);
  background: var(--color-box-background);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3em var(--content-padding);
}

.text h3 {
  font-size: 1.6em;
  color: inherit;
  font-family: 'Roboto Slab', 'Roboto', sans-serif;
  margin: 0;
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-top: 10px;
  line-height: 1.2rem;
  color: inherit;
}

@media (max-width: 768px) {
  .outer {
    margin-bottom: 15px;
  }
}
</style>