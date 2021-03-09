<template>
  <ul v-if="items" class="catalogue-items">
    <li v-for="item in items" :key="item.id" class="catalogue-items__item">
      <ListFormat :data="item" />
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
