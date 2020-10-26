<template>
  <div v-if="!data"></div>
  <NuxtLink  
    v-else-if="image || video.content.videos" 
    :to="path" 
    class="outer"
    :style="{ gridColumnEnd: colSpan ? `span ${colSpan}` : `span 4` }"
  >
    <div class="media-wrapper">
      <WideScreenRatio>
        <div class="media-inner">
          <div  v-if="video.content.videos" >
            <!-- https://media.vimejs.com/720p.mp4 -->
            <!-- video/mp4 -->
            <!-- https://media.crystallize.com/furniture/20/6/12/21/color-is-back-grafitti/cmaf/color-is-back-grafitti.mpd -->
            <!-- https://media.crystallize.com/furniture/20/6/12/21/color-is-back-grafitti/cmaf/color-is-back-grafitti.m3u8 -->
            <!-- application/x-mpegURL -->
            <VideoPlayer :options="videoOptions"/>
          </div>
          <div class="image" v-else-if="image">
            <ImageComponent
              :image="image"
              sizes="(min-width ${screen.md}px) 33vw, 100vw"
            />
          </div>
        </div>
      </WideScreenRatio>
    </div>
    <div class="text">
      <H3>{{ this.name }}</H3>
      <div class="description">
        <ContentTransformer v-for="(content, i) in description.content.json" :key="i" >
          <div v-for="(child, childindex) in content.children" :key="childindex">
            <p>{{ child.textContent }}</p> 
          </div>
        </ContentTransformer>
      </div>
    </div>
  </NuxtLink>
  <NuxtLink v-else :to="path" class="outer">
    <div class="text">
      <H3>{{ this.name }}</H3>
      <div class="description">
        <ContentTransformer v-for="(content, i) in description.content.json" :key="i" >
          <div v-for="(child, childindex) in content.children" :key="childindex">
            <p>{{ child.textContent }}</p> 
          </div>
        </ContentTransformer>
      </div>
    </div>
  </NuxtLink>
</template>

<script>

export default {
  props: {
    data: Object,
    colSpan: {
      type: String,
      default: '4'
    }
  },
  data() {
    return {
      path: this.data.path,
      name: this.data.name,
      video: this.findComponents(this.data.components, 'name', 'Video'),
      description: this.findComponents(this.data.components, 'name', 'Intro'),
      image: '',
      sources: [],
      videoOptions: {
				autoplay: true,
        controls: true,
				sources: [
					{
						src:
							"https://media.vimejs.com/720p.mp4",
						  type: "video/mp4"
					}
				]
			}
    }
  },
  mounted() {
    const images = this.data.components?.find((c) => c.type === 'images');
    this.image = images?.content?.images?.[0];

    let playlists = [];

    if (this.video.content.videos) {
      this.video.content.videos.map(v => {
        playlists = v.playlists;
      })

      this.sources =
      playlists?.map((playlist) => ({
        type: this.getVideoType(playlist),
        src: playlist
      })) || [];
    }
  },
  methods: {
    findComponents(components, property, filter) {
      return components.find((c) => c[property] === filter);
    },
    getVideoType(url) {
      const HLS_EXTENSION = /\.(m3u8)($|\?)/i;
      const DASH_EXTENSION = /\.(mpd)($|\?)/i;
      const MOV_EXTENSION = /\.(mov)($|\?)/i;

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
.grid {
  display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-gap: 1rem;
}

.outer {
  display: flex;
  flex-direction: column;
  height: 100%;

   /* ${(p) => (p.span ? `grid-column-end: span ${p.span}` : null)}; */
}

.media-wrapper {
  flex: 0 0 auto;
  /* padding-top: 56.25%; */
  position: relative;
}

.media-screen-ratio {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.media-inner {
  flex: 1 1 100%;
}

.image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image img {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  flex: 1 1 auto;
  color: var(--color-text-main);
  background: var(--color-box-background);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3em var(--content-padding);
}

.text h3 {
  font-size: 1.6em;
  color: inherit;
  font-family: 'Roboto Slab', 'Roboto', sans-serif;
  margin: 0;
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-top: 10px;
  line-height: 1.2rem;
  color: inherit;
}

@media (max-width: 768px) {
  .outer {
    margin-bottom: 15px;
  }
}
</style>