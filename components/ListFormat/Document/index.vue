<template>
  <NuxtLink :to="path" class="list-format-document">
    <div class="list-format-document__info">
      <h3 class="list-format-document__title">{{ name }}</h3>
      <div v-if="description" class="list-format-document__introduction">
        <CrystallizeContentTransformer :data="description" />
      </div>
    </div>

    <div v-if="image || video" class="list-format-document__media">
      <CrystallizeVideo v-if="video" :video="video" />
      <CrystallizeImage
        v-else
        :image="image"
        :width="1024"
        sizes="(min-width 1024px) 33vw, 100vw"
        class="list-format-document__image"
      />
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
    const c = this.data?.components || [];

    return {
      path: this.data.path,
      name: this.data.name,
      type: this.data.type,
      image: c.find((c) => c.type === "images")?.content?.images?.[0],
      video: c.find((c) => c.type === "videos")?.content?.videos?.[0],
      description: c.find((c) => c.type === "richText")?.content?.json,
    };
  },
};
</script>


<style scoped src='./index.css'></style>