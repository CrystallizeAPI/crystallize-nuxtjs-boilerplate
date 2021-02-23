<template>
  <ul v-if="items" class="items">
    <li v-for="item in items" :key="item.id" class="item">
      <Product v-if="item.type === 'product'" :data="item" />
      <FolderOrDocument v-else :data="item" />
    </li>
  </ul>
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

<style scoped src='./index.css'></style>
