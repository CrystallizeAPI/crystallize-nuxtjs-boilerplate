<template>
  <section
    class="banner"
    :class="hasTextAsOverlay ? 'banner--withOverlay' : ''"
  >
    <div class="banner__content">
      <div>
        <h2 class="banner__title">{{ title }}</h2>
        <div v-if="description" class="banner__description">
          <CrystallizeContentTransformer :data="description" />
        </div>
        <NuxtLink class="banner__cta" :to="link">
          {{ linkText }}
        </NuxtLink>
      </div>
    </div>
    <div v-if="image" class="banner__media">
      <CrystallizeImage
        v-if="image"
        :image="image"
        :width="1024"
        sizes="(max-width: 700px) 100vw, 1200px"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    const hasFindFunction = Boolean(this.data.components?.find);
    const c = this.data?.components || [];

    const title =
      hasFindFunction && c.find((c) => c.name === "Title")?.content?.text;
    const description =
      hasFindFunction && c.find((c) => c.name === "Description")?.content?.json;
    const linkText =
      hasFindFunction && c.find((c) => c.name === "Link text")?.content?.text;
    const link =
      hasFindFunction && c.find((c) => c.name === "Link")?.content?.text;
    const image =
      hasFindFunction &&
      c.find((c) => c.type === "images")?.content?.images?.[0];
    const hasTextAsOverlay =
      hasFindFunction &&
      c.find((c) => c.name === "Add text as overlay")?.content?.value;

    return {
      title,
      description,
      linkText,
      link,
      image,
      hasTextAsOverlay,
    };
  },
};
</script>

<style scoped src='./index.css'></style>
