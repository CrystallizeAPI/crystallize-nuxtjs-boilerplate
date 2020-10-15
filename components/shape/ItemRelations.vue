<template>
  <div>
    <div v-if="!items"></div>
    <ul class="outer" v-else>
      <li v-for="item in items" :key="item.id">
        <FolderItem 
          v-if="item.type === 'product'" 
          :data="item"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['items']
}
</script>

<style scoped>
.outer {
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: 20px;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .outer { 
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .outer { 
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>