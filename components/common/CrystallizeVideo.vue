<template>
  <div class="outer">
    <div class="inner">Video here</div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    // this.player = videojs(
    //   this.$refs.videoPlayer,
    //   this.options,
    //   function onPlayerReady() {
    //     console.log("onPlayerReady", this);
    //   }
    // );
  },
  beforeDestroy() {
    // if (this.player) {
    //   this.player.dispose();
    // }
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
