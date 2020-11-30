<template>
  <NuxtLink :to="path" class="outer">
    <div v-if="image || video" class="media-wrapper">
      <CrystallizeVideo v-if="video" :video="video" />
      <CrystallizeImage
        v-else
        :image="image"
        sizes="(min-width 1024px) 33vw, 100vw"
      />
    </div>
    <div class="text">
      <h2>{{ name }}</h2>
      <div class="description">
        <CrystallizeContentTransformer :data="description" />
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    const d = this.data;
    const c = d?.components || [];

    return {
      path: d.path,
      name: d.name,
      image: c.find((c) => c.type === "images")?.content?.images?.[0],
      video: c.find((c) => c.type === "videos")?.content?.videos?.[0],
      description: c.find((c) => c.type === "richText")?.content?.json,
    };
  },
};
</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--color-text-main);
  background: var(--color-box-background);
  padding: 1em;
}

.outer:hover {
  text-decoration: none;
}

.media-wrapper >>> img,
.media-wrapper >>> video {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.text {
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3em var(--content-padding);
}

.text h3 {
  font-size: 1.6em;
  color: inherit;
  font-family: "Roboto Slab", "Roboto", sans-serif;
  margin: 0;
}

.description {
  font-family: "Roboto", sans-serif;
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
