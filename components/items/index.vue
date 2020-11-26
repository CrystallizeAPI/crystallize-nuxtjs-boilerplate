<template>
  <div v-if="items" class="items">
    <template v-for="item in items">
      <ProductItem v-if="item.type === 'product'" :key="item.id" :data="item" />
      <FolderItem
        v-else-if="item.type === 'folder'"
        :key="item.id"
        :data="item"
      />
      <DocumentItem v-else :key="item.id" :data="item" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
</style>
