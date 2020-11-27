<template>
  <div>Todo: video</div>
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
