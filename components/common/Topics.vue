<template>
  <div v-if="topicMaps"></div>
  <div v-else>
    <div 
      class="topic-map" 
      v-for="topic in topicMaps" :key="topic.name"
    > 
      <div class="list">
        <Items
          v-for="{ node } in topic.items.edges"
          :key="node.id"
          :item="node"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['topicMaps'],
  mounted() {
    
  }
}
</script>

<style scoped>
.topic-map {
  position: relative;
  margin-top: 15px;
}

.topic-title {
  font-size: 16px;
  opacity: 0.6;
  top: 0;
  height: 40px;
  left: 40px;
  position: absolute;
  transform-origin: top left;
  transform: rotate(90deg);
}

.list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}

.related-topics {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.related-topics h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 10px;
}

@media (max-width: 768px) { 
  .topic-map {
    margin: 15px 10px 0;
  }

  .list {
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1600px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}

@media (min-width: 1600px) {
  .list {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>