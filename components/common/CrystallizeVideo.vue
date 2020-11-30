<template>
  <div class="outer">
    <div class="inner">
      <video ref="video" class="video-js" playslinline />
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "dashjs";
import "videojs-contrib-dash";
import "video.js/dist/video-js.css";

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
  mounted() {
    const sources = this.getSources(this.video.playlists);

    this.player = videojs(
      this.$refs.video,
      {
        sources,
        autoplay: this.autoplay,
        loop: true,
        controls: true,
        fluid: true,
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
        if (this.autoplay) {
          this.play();
        }
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    getSources(playlists) {
      const HLS_EXTENSION = /\.(m3u8)($|\?)/i;
      const DASH_EXTENSION = /\.(mpd)($|\?)/i;
      const MOV_EXTENSION = /\.(mov)($|\?)/i;

      function getVideoType(url) {
        if (HLS_EXTENSION.test(url)) {
          return "application/x-mpegURL";
        } else if (DASH_EXTENSION.test(url)) {
          return "application/dash+xml";
        } else if (MOV_EXTENSION.test(url)) {
          return "video/mp4";
        } else {
          return `video/mp4`;
        }
      }

      return (
        playlists
          ?.map((playlist) => ({
            type: getVideoType(playlist),
            src: playlist,
          }))
          .sort((s) => (HLS_EXTENSION.test(s.src) ? -1 : 1)) || []
      );
    },
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

.outer >>> .video-js {
  height: 100% !important;
  position: absolute;
  z-index: 0;
}
.outer >>> .video-js video {
  transform: none;
}

.outer >>> .video-js:not(.vjs-has-started) video {
  cursor: pointer;
}

.outer >>> .video-js button.vjs-big-play-button {
  opacity: 0;
}
</style>
