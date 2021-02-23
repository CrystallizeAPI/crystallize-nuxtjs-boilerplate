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
      type: d.type,
      image: c.find((c) => c.type === "images")?.content?.images?.[0],
      video: c.find((c) => c.type === "videos")?.content?.videos?.[0],
      description: c.find((c) => c.type === "richText")?.content?.json,
    };
  },
};
</script>

<style scoped src='./folder-or-document.css'></style>
