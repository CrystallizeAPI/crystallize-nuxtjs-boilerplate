<template>
  <div v-if="data" class="paragraphs">
    <template v-for="(paragraph, index) in data.paragraphs">
      <div :key="index" class="paragraph">
        <H3 v-if="paragraph.title">{{ paragraph.title.text }}</H3>
        <CrystallizeContentTransformer
          v-if="paragraph.body"
          :data="paragraph.body.json"
        />
        <Images :data="paragraph" />
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

<style scoped>
.paragraph:not(:last-child) {
  margin-bottom: var(--content-padding);
}
</style>
