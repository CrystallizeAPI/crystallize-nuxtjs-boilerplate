<template>
  <div class="images">
    <template v-for="image in data.images">
      <CrystallizeImage :key="image.url" :image="image" class="image" />
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
.images:not(:last-child) {
  margin-bottom: 50px;
}

.image,
.image >>> img {
  display: block;
  width: auto;
}

.image:not(:last-child) {
  margin-bottom: 5px;
}

@media (min-width: 1024px) {
  .images {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
  }

  .images:not(:last-child) {
    margin-bottom: 100px;
  }

  .image:first-child {
    grid-column-end: span 2;
  }
  .image:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
