<template>
  <div class="crystallize-components-images">
    <template v-for="image in data.images">
      <CrystallizeImage
        :key="image.url"
        :image="image"
        class="crystallize-components-images__image"
      />
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

<style scoped src='./images.css'></style>
