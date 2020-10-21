<template>
  
</template>

<script>
const HLS_EXTENSION = /\.(m3u8)($|\?)/i;
const DASH_EXTENSION = /\.(mpd)($|\?)/i;
const MOV_EXTENSION = /\.(mov)($|\?)/i;

export default {
  props: {
    playlists: {
      type: Array,
      default: []
    },
    autoplay: {
      type: Boolean,
       default: false
    },
    loop: {
      type: Boolean,
       default: false
    },
    controls: {
      type: Boolean,
       default: true
    },
    fluid: {
      type: Boolean,
       default: true
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    getVideoType(url) {
      if (HLS_EXTENSION.test(url)) {
        return 'application/x-mpegURL';
      } else if (DASH_EXTENSION.test(url)) {
        return 'application/dash+xml';
      } else if (MOV_EXTENSION.test(url)) {
        return 'video/mp4';
      } else {
        return `video/mp4`;
      }
    }
  }
}
</script>

<style scoped>
.outer {

}
.outer .video-js {
  height: 100% !important;
  position: absolute;
  z-index: 0;
}

.outer .video-js video {
   transform: none;
}

.outer .video-js video:not(.vjs-has-started) {
  cursor: pointer;
}

.outer .video-js button.vjs-big-play-button {
  opacity: 0;
}

.overlay {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
}

.overlay::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  /* width: ${playSize}px; */
  /* height: ${playSize}px; */
  /* margin: -${playSize / 2}px 0 0 -${playSize / 2}px; */
  border: none;
  background: url('/static/play.svg') no-repeat center center;
  background-size: contain;
  background-color: transparent !important;
}

.overlay .vjs-has-started + .overlay {
   display: none;
}

</style>