<template>
  <div>
    <Outer>
      <SubHeader centerContent="true">
        <H1>{{ title.content.text }}</H1>
         <ContentTransformer v-for="(content, i) in description.content.json" :key="i" >
          <div v-for="(child, childindex) in content.children" :key="childindex">
            <p>{{ child.textContent }}</p> 
          </div>
        </ContentTransformer>
      </SubHeader>
      <div class="hero-image">
        <CrystallizeImage 
          v-for="(image, index) in images.content.images"
          :key="index"
          :image="image"
          className="img"
          :sizes="index > 0 ? '40vw' : '80vw'"
         />
      </div>
      <Shape :components="componentsRest" />
    </Outer>
    <div v-if="relatedProducts.content.items" class="related">
      <H2>RELATED PRODUCT</H2>
      <!-- <div class="list" v-if="relatedProducts.content">
         <Items
          v-for="(item, i) in relatedProducts.content.items" 
          :key="i"
          :item="item"
        />   
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['document'],
  data() {
    return {
      title: this.findComponents(this.document.components, 'name', 'Title'),
      description: this.findComponents(this.document.components, 'name', 'Intro'),
      images: this.findComponents(this.document.components, 'name', 'Image'),
      relatedProducts:  this.findComponents(this.document.components, 'name', 'Products'),
      componentsRest:  this.document?.components?.filter((c) => !['Intro', 'Title', 'Image', 'Products'].includes(c.name))
    }
  },
  methods: {
    findComponents(components, property, filter) {
      return components.find((c) => c[property] === filter);
    },
  }
}
</script>

<style scoped>
.hero-image {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 100px;
  grid-gap: 5px;
}

.img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img:first-child {
  grid-column-end: span 2;
}

.secondary-image-block:last-child {
  grid-column-end: span 2;
}

.img > img {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.list {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(12, 1fr);
}

.h2 {
  display: block;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--color-text-main);
}

.related {
  border-top: 2px solid #efefef;
  max-width: 1600px;
  padding: 100px 100px 0 100px;
  margin: 100px auto;
  display: block;
}

@media (min-width: 1024px) and (max-width: 1600px) {
  .list {
     grid-template-columns: repeat(9, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .list {
     grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 768px) {
  .list {
     grid-template-columns: repeat(3, 1fr);
  }
  .h2 {
    text-align: center;
  }
}

@media (max-width: 1600px) {
  .related {
    padding: 50px;
  }
}

</style>