<template>
  <div ref="outer" class="outer">
    <div class="inner">
      <LazyCrystallizeVideoPlayer
        v-if="show"
        :video="video"
        :autoplay="autoplay"
      />
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: null,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  data: () => {
    return {
      show: false,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!this.show) {
          this.show = entry.isIntersecting;
        }
      },
      {
        rootMargin: "200px 0px",
      }
    );

    this.observer.observe(this.$refs.outer);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>

<style scoped>
.outer {
  padding-top: 56.25%;
  position: relative;
}

.inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
