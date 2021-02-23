<template>
  <div v-if="data" class="paragraphs">
    <template v-for="(paragraph, index) in data.paragraphs" :load="log(paragraph)">
      <div :key="index" class="paragraph">
        <h3 v-if="paragraph.title">{{ paragraph.title.text }}</h3>
        <CrystallizeContentTransformer
          v-if="paragraph.body"
          :data="paragraph.body.json"
        />
        <CrystallizeComponentsImages :data="paragraph" />
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
  methods: {
    log(item) {
      console.log(item)
    }
  }
};
</script>

<style scoped src='./paragraph-collection.css'></style>
