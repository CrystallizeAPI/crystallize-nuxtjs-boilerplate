<template>
  <div class="videos">
    <template v-for="video in data.videos">
      <CrystallizeVideo :key="video.url" :video="video" class="video" />
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
.videos:not(:last-child) {
  margin-bottom: 50px;
}

.video,
.video >>> img {
  display: block;
}

.video:not(:last-child) {
  margin-bottom: 5px;
}

@media (min-width: 1024px) {
  .videos {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
  }

  .videos:not(:last-child) {
    margin-bottom: 100px;
  }

  .video:first-child {
    grid-column-end: span 2;
  }
  .video:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
