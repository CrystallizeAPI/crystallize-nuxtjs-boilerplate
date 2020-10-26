<template>
  <div>
    <video ref="videoPlayer" class="video-js" ></video>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
   props: {
    options: {
      type: Object,
      default() {
          return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    })
  },
  beforeDestroy() {
    if (this.player) {
        this.player.dispose()
    }
  }
}
</script>

<style scoped>
.video-demo {
  width: 640px !important;
  height: 600px !important;
}
</style>