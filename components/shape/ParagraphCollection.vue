<template>
  <div>
    <div class="outer" v-for="(paragraph, index) in paragraphs" :key="index">
  <div class="text" >
    <div v-if="!!paragraph.title && paragraph.title.text" class="title">
      <H3>{{ paragraph.title.text }}</H3>
    </div>
    <div v-if="paragraph.body" class="body" >
      {{ JSON.stringify(paragraph.body) }}
    </div>
  </div>
  <div class="media">
    <Images 
      :images="paragraph.images" 
    />
  </div>
</div>
  </div>
</template>

<script>
export default {
  props: ['paragraphs']
}
</script>

<style scoped>
.outer {
  margin: 0;
}

.title {
  margin: 1em var(--content-padding);
}

/* .list picture:nth-child(3) {
  grid-column-start: span 2;
} */


.body {
  margin: 1em var(--content-padding);
}

.text {
  margin-bottom: 100px;
}

.media {
  margin-bottom: 100px;
}

.media picture:nth-child(3) {
  grid-column-start: span 2 !important;
  background: red;
}

</style>

 