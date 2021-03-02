<template>
  <ul v-if="items" class="items">
    <li v-for="item in items" :key="item.id" class="item">
      <ListFormatProduct v-if="item.type === 'product'" :data="item" />
      <ListFormatDocument v-else-if="item.type === 'document'" :data="item" />
      <ListFormatFolder v-else-if="item.type === 'folder'" :data="item" />
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
  methods: {
    log: function (payload) {
      console.log(payload);
    },
  },
};
</script>

<style scoped src='./index.css'></style>
