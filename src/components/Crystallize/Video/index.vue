<template>
  <div ref="outer" class="outer">
    <div class="inner">
      <LazyCrystallizeVideoPlayer
        v-if="show"
        :video="video"
        :autoplay="autoplay"
      />
      <div v-else>{{ $t("common.loading") }}...</div>
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

<style scoped src='./index.css'></style>
