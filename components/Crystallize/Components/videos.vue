<template>
  <div v-if="videos" class="videos">
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

<style scoped src='./videos'></style>
