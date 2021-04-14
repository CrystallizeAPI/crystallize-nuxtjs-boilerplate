<template>
  <div v-if="components" class="components">
    <div v-for="component in components" :key="component.id" class="component">
      <CrystallizeComponentsSingleLine
        v-if="component.type === 'singleLine'"
        :data="component.content"
      />
      <CrystallizeComponentsRichText
        v-else-if="
          component.type === 'richText' &&
          component.content &&
          component.content.json
        "
        :data="component.content"
      />
      <CrystallizeComponentsParagraphCollection
        v-else-if="component.type === 'paragraphCollection'"
        :data="component.content"
      />
      <CrystallizeComponentsImages
        v-else-if="component.type === 'images' && component.content.images"
        :data="component.content.images"
      />
      <CrystallizeComponentsVideos
        v-else-if="component.type === 'videos'"
        :data="component.content"
      />
      <CrystallizeComponentsPropertiesTable
        v-else-if="
          component.type === 'propertiesTable' &&
          component.content !== null &&
          component.content.sections
        "
        :data="component.content"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    components: {
      type: Array,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
.component:not(:last-child) {
  margin-bottom: 30px;
}
</style>
