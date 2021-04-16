<template>
  <NuxtLink :to="path" class="micro-format-document">
    <!--
      article tag added only for semantic purposes.
      If you want to remove it, add its styles to the
      `.micro-format-product` selector
    -->
    <article class="micro-format-product__inner">
      <div class="micro-format-document__info">
        <h3 class="micro-format-document__title">{{ name }}</h3>
        <ul v-if="topics" class="micro-format-document__topics">
          <li
            v-for="topic in topics"
            :key="topic.id"
            class="micro-format-document__topic"
          >
            <Topic :isUnderlined="true" :data="topic" />
          </li>
        </ul>
      </div>

      <div v-if="image" class="micro-format-document__media">
        <CrystallizeImage
          :image="image"
          :width="250"
          class="micro-format-document__image"
        />
      </div>
    </article>
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