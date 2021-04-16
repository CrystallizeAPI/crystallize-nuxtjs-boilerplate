<template>
  <div v-if="data" class="paragraphs">
    <template v-for="(paragraph, index) in data.paragraphs">
      <div :key="index" class="paragraph">
        <h3 v-if="paragraph.title">{{ paragraph.title.text }}</h3>
        <CrystallizeContentTransformer
          v-if="paragraph.body && paragraph.body.json"
          :data="paragraph.body.json"
        />

        <CrystallizeComponentsImages
          v-if="paragraph.images"
          :data="paragraph.images"
          class="paragraphs-media"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped src='./paragraph-collection.css'></style>
