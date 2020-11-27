<template>
  <div class="images">
    <template v-for="image in data.images">
      <CrystallizeImage :key="image.url" :image="image" />
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
.images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 100px;
  gap: 5px;
}

.images > :first-child {
  grid-column-end: span 2;
}
</style>
