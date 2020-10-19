<template>
  <div v-if="!data"></div>
  <NuxtLink v-else>
    <div class="outer">
      <div class="text">
        <H3>{{ this.name }}</H3>
        <div class="description">
          <div class="media-wrapper">
            <WideScreenRatio>
              <!-- <div class="media-inner">
                <div>
                  video here
                </div>
                <ImageComponent
                  :image="images?.content?.images?.[0]"
                   sizes="(min-width ${screen.md}px) 33vw, 100vw"
                />
              </div> -->
            </WideScreenRatio>
          </div>
          <ContentTransformer v-for="(content, i) in component.content.json" :key="i" >
            <div v-for="(child, childindex) in content.children" :key="childindex">
              <p>{{ child.textContent }}</p> 
            </div>
          </ContentTransformer>
        </div>
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
      images: this.findComponents(this.data.components, 'type', 'images'),
      vdeo: this.findComponents(this.data.components, 'name', 'Video'),
      description: this.findComponents(this.data.components, 'name', 'Intro'),
    }
  },
  mounted() {
    // let image;
    // const images = this.data.components?.find((c) => c.type === 'images');
    // image = images?.content?.images?.[0];
    // const description = this.data.components?.find((c) => c.name === 'Intro');
    // const video = this.data.components?.find((c) => c.name === 'Video');
  },
  methods: {
    findComponents(components, property, filter) {
      return components.find((c) => c[property] === filter);
    }
  }
}
</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  height: 100%;

   /* ${(p) => (p.span ? `grid-column-end: span ${p.span}` : null)}; */
}

.media-wrapper {
  flex: 0 0 auto;
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