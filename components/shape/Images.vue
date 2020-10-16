<template>
  <div>
    <div v-if="images.length === 0"></div>
    <div v-if="images.length === 1">
      <div class="outer">
        <ImageComponent :image="images[0]" sizes="80vw" />
      </div>
    </div>
    <div v-else >
      <div class="outer">
        <div class="list">
          <ImageComponent 
            v-for="(image, index) in images" 
            :key="index" 
            :image="image" 
            sizes="80vw"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['images']
}
</script>

<style scoped>
.outer {
  margin: 0 0 2em;
}

.list {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 100px;
}

.list picture {
  min-height: 300px;
}

.list picture:nth-child(3) {
  grid-column-start: span 2;
}

.list img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 500px) {
  .list picture {
    min-height: 100px;
  }
}

</style>