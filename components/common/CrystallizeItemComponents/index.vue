<template>
  <div v-if="components" class="components">
    <div v-for="component in components" :key="component.id" class="component">
      <SingleLine
        v-if="component.type === 'singleLine'"
        :data="component.content"
      />
      <RichText
        v-else-if="component.type === 'richText'"
        :data="component.content"
      />
      <ParagraphCollection
        v-else-if="component.type === 'paragraphCollection'"
        :data="component.content"
      />
      <Images
        v-else-if="component.type === 'images'"
        :data="component.content"
      />
      <PropertiesTable
        v-else-if="component.type === 'propertiesTable'"
        :data="component.content"
      />
      <div v-else>No renderer for "{{ component.type }}"</div>
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
